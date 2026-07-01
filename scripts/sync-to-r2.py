#!/usr/bin/env python3
"""
Sync local media/ folder to Cloudflare R2 and generate a catalog.json
for server-side catalog fetching (uses Cloudflare native API, no boto3).
"""
import hashlib
import json
import math
import mimetypes
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import quote

try:
    import requests
except ImportError:
    print("Error: 'requests' library not found. Please run: pip install requests")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Environment / config
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = BASE_DIR / "media"

CLOUDFLARE_API_KEY = os.getenv("CLOUDFLARE_API_KEY", "")
CLOUDFLARE_EMAIL = os.getenv("CLOUDFLARE_EMAIL", "")
R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID", "")
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID", "")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY", "")
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME", "")
VITE_MEDIA_BASE_URL = os.getenv("VITE_MEDIA_BASE_URL", "")

VIDEO_EXTENSIONS = {".mp4", ".mov", ".webm", ".m4v"}
PRINT_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".webp", ".svg"}
ACRONYMS = {"bne", "ofm", "dmca", "seo", "ai", "qr"}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def env_from_file():
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip("'\""))


env_from_file()

# Re-read after loading .env
CLOUDFLARE_API_KEY = os.getenv("CLOUDFLARE_API_KEY", CLOUDFLARE_API_KEY)
CLOUDFLARE_EMAIL = os.getenv("CLOUDFLARE_EMAIL", CLOUDFLARE_EMAIL)
R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID", R2_ACCOUNT_ID)
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID", R2_ACCESS_KEY_ID)
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY", R2_SECRET_ACCESS_KEY)
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME", R2_BUCKET_NAME)
VITE_MEDIA_BASE_URL = os.getenv("VITE_MEDIA_BASE_URL", VITE_MEDIA_BASE_URL)


def title_from_filename(relative_path: str) -> str:
    filename = Path(relative_path).stem
    title = re.sub(r"[-_]+", " ", filename).strip()
    words = [w for w in title.split(" ") if w]
    result = []
    for word in words:
        lower = word.lower()
        if lower in ACRONYMS:
            result.append(lower.upper())
        else:
            result.append(lower[0].upper() + lower[1:])
    return " ".join(result)


def description_from_filename(relative_path: str, media_type: str) -> str:
    title = title_from_filename(relative_path)
    topic = re.sub(r"[^a-z0-9]+", " ", title.lower()).strip() or "creator education"
    if media_type == "video":
        return (
            f"Blacklisted University video guide on {topic}, created to help creators "
            "and operators understand high-value business, marketing, and compliance lessons."
        )
    return (
        f"Blacklisted University print material: {title}, a downloadable reference asset "
        "for creators, professionals, and agencies building protected brands."
    )


def format_bytes(b: int) -> str:
    if b == 0:
        return "0 B"
    units = ["B", "KB", "MB", "GB", "TB"]
    index = min(int(math.log(b) / math.log(1024)), len(units) - 1)
    value = b / (1024 ** index)
    if value >= 10 or index == 0:
        return f"{int(value)} {units[index]}"
    return f"{value:.1f} {units[index]}"


# ---------------------------------------------------------------------------
# Cloudflare R2 helpers (native API)
# ---------------------------------------------------------------------------

def cf_headers():
    return {
        "X-Auth-Email": CLOUDFLARE_EMAIL,
        "X-Auth-Key": CLOUDFLARE_API_KEY,
        "Content-Type": "application/json",
    }


def cf_get(path: str) -> dict:
    url = f"https://api.cloudflare.com/client/v4{path}"
    r = requests.get(url, headers=cf_headers())
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"CF GET {path} failed: {data}")
    return data


def cf_post(path: str, body: dict) -> dict:
    url = f"https://api.cloudflare.com/client/v4{path}"
    r = requests.post(url, headers=cf_headers(), json=body)
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"CF POST {path} failed: {data}")
    return data


def discover_account_id() -> str:
    if R2_ACCOUNT_ID:
        return R2_ACCOUNT_ID
    data = cf_get("/accounts")
    for acct in data.get("result", []):
        aid = acct.get("id", "")
        if aid:
            print(f"[CF] Discovered account: {acct.get('name')} ({aid})")
            return aid
    raise RuntimeError("Could not discover Cloudflare account ID from /accounts")


def ensure_bucket(account_id: str, bucket: str):
    path = f"/accounts/{account_id}/r2/buckets"
    data = cf_get(path)
    names = [b.get("name") for b in data.get("result", [])]
    if bucket in names:
        print(f"[R2] Bucket '{bucket}' already exists")
        return

    print(f"[R2] Creating bucket '{bucket}' ...")
    cf_post(f"{path}/{bucket}", {})
    print(f"[R2] Bucket '{bucket}' created")


def upload_file(account_id: str, bucket: str, key: str, filepath: Path):
    url = (
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}"
        f"/r2/buckets/{bucket}/objects/{quote(key, safe='')}"
    )
    content_type, _ = mimetypes.guess_type(str(filepath))
    if not content_type:
        content_type = "application/octet-stream"

    with open(filepath, "rb") as f:
        r = requests.put(
            url,
            headers={
                "X-Auth-Email": CLOUDFLARE_EMAIL,
                "X-Auth-Key": CLOUDFLARE_API_KEY,
                "Content-Type": content_type,
            },
            data=f,
        )
    if r.status_code not in (200, 201):
        raise RuntimeError(f"Upload failed for {key}: {r.status_code} {r.text[:300]}")
    return url


def ensure_bucket_public(account_id: str, bucket: str):
    """Enable public access (bucket-level)."""
    url = (
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}"
        f"/r2/buckets/{bucket}/settings/public-access"
    )
    r = requests.patch(
        url,
        headers={
            "X-Auth-Email": CLOUDFLARE_EMAIL,
            "X-Auth-Key": CLOUDFLARE_API_KEY,
            "Content-Type": "application/json",
        },
        json={"enabled": True},
    )
    data = r.json()
    if data.get("success"):
        print("[R2] Public access enabled")
    else:
        print(f"[R2] Public access may already be enabled or failed: {data}")


# ---------------------------------------------------------------------------
# Catalog generation
# ---------------------------------------------------------------------------

def generate_catalog(media_dir: Path, public_url: str) -> dict:
    videos = []
    print_materials = []

    for file_path in sorted(media_dir.rglob("*")):
        if not file_path.is_file() or file_path.name.startswith("."):
            continue

        relative_path = file_path.relative_to(media_dir)
        key = str(relative_path).replace("\\", "/")
        extension = file_path.suffix.lower()

        if extension not in VIDEO_EXTENSIONS and extension not in PRINT_EXTENSIONS:
            continue

        content_type, _ = mimetypes.guess_type(str(file_path))
        if not content_type:
            content_type = "application/octet-stream"

        stat = file_path.stat()
        media_type = "video" if extension in VIDEO_EXTENSIONS else "print"
        url = f"{public_url}/{quote(key, safe='')}"

        item = {
            "id": hashlib.sha256(key.encode()).hexdigest()[:16],
            "title": title_from_filename(key),
            "description": description_from_filename(key, media_type),
            "type": media_type,
            "url": url,
            "format": extension.lstrip(".").upper(),
            "sizeBytes": stat.st_size,
            "sizeLabel": format_bytes(stat.st_size),
            "updatedAt": datetime.fromtimestamp(stat.st_mtime).isoformat(),
        }

        if media_type == "video":
            videos.append(item)
        else:
            print_materials.append(item)

    return {
        "videos": sorted(videos, key=lambda x: x["title"]),
        "printMaterials": sorted(print_materials, key=lambda x: x["title"]),
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    missing = []
    if not CLOUDFLARE_API_KEY:
        missing.append("CLOUDFLARE_API_KEY")
    if not CLOUDFLARE_EMAIL:
        missing.append("CLOUDFLARE_EMAIL")
    if missing:
        print("\n[Error] Missing Cloudflare credentials in .env / environment:")
        for m in missing:
            print(f"  {m}")
        print("Add them to .env or export them as environment variables.")
        sys.exit(1)

    if not MEDIA_DIR.exists():
        print(f"[Error] Media directory {MEDIA_DIR} not found.")
        sys.exit(1)

    account_id = discover_account_id()
    bucket = R2_BUCKET_NAME or "blacklisted-studio-media"
    print(f"\n[Sync] Target bucket: {bucket}")

    ensure_bucket(account_id, bucket)
    ensure_bucket_public(account_id, bucket)

    uploaded = 0
    failed = 0
    for file_path in sorted(MEDIA_DIR.rglob("*")):
        if not file_path.is_file() or file_path.name.startswith("."):
            continue

        relative = file_path.relative_to(MEDIA_DIR)
        key = str(relative).replace("\\", "/")
        ext = file_path.suffix.lower()

        if ext not in VIDEO_EXTENSIONS and ext not in PRINT_EXTENSIONS:
            continue

        try:
            print(f"[Sync] Uploading {key} ...", end="\r")
            upload_file(account_id, bucket, key, file_path)
            uploaded += 1
        except Exception as e:
            print(f"\n[Error] Failed to upload {key}: {e}")
            failed += 1

    print(f"\n[Sync] Uploaded {uploaded} files ({failed} failed).")

    # Generate & upload catalog.json
    public_url = VITE_MEDIA_BASE_URL or f"https://pub-{account_id}.r2.dev"
    print(f"\n[Sync] Generating catalog.json ...")
    catalog = generate_catalog(MEDIA_DIR, public_url)

    catalog_local = MEDIA_DIR / "catalog.json"
    with open(catalog_local, "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2)

    catalog_key = "catalog.json"
    upload_file(account_id, bucket, catalog_key, catalog_local)
    print(f"[Sync] Uploaded catalog.json to {public_url}/catalog.json")

    # Summary
    print("\n=== R2 CONFIGURATION COMPLETE ===")
    print(f"Public URL: {public_url}")
    print(f"Bucket:     {bucket}")
    print(f"Account:    {account_id}")
    print("\nAdd these to Render Dashboard Environment Variables:")
    print(f"  VITE_MEDIA_BASE_URL = {public_url}")
    print(f"  R2_ACCOUNT_ID       = {account_id}")
    print(f"  R2_BUCKET_NAME      = {bucket}")
    print("\nIf you need S3-compatible credentials for other tools, create an R2 API Token:")
    print("  Cloudflare Dashboard -> R2 -> Manage R2 API Tokens -> Create API Token")
    print("  Then set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in Render.")


if __name__ == "__main__":
    main()
