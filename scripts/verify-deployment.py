import os
from pathlib import Path

def check_env():
    env_path = Path(__file__).parent.parent / ".env"
    env_vars = {}
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    key, value = line.strip().split("=", 1)
                    env_vars[key] = value.strip("'\"")

    print("\n=== DEPLOYMENT CHECKLIST ===")
    
    # 1. OAuth Portal Check
    print("\n[1] OAUTH PORTAL CONFIGURATION")
    site_url = env_vars.get("VITE_SITE_URL", "https://blacklisted.studio")
    redirect_uri = f"{site_url.rstrip('/')}/api/oauth/callback"
    print(f"    - Authorized Redirect URI: {redirect_uri}")
    print(f"    - Ensure this is added to your OAuth Portal settings.")

    # 2. Firebase Check
    print("\n[2] FIREBASE CONFIGURATION")
    domain = site_url.split("//")[-1].split("/")[0]
    print(f"    - Authorized Domain: {domain}")
    print(f"    - Ensure this is added in Firebase Console -> Auth -> Settings -> Authorized Domains.")

    # 3. Render Environment Variables
    print("\n[3] RENDER DASHBOARD ENV VARS")
    required_vars = [
        "VITE_APP_ID",
        "VITE_OAUTH_PORTAL_URL",
        "OAUTH_SERVER_URL",
        "JWT_SECRET",
        "DATABASE_URL",
        "VITE_SITE_URL",
        "VITE_MEDIA_BASE_URL"
    ]
    
    print("    Ensure the following are set in the Render Dashboard:")
    for var in required_vars:
        status = "✓ Found in .env" if var in env_vars else "⚠ MISSING in local .env"
        print(f"    - {var: <25} {status}")

    print("\n--- ACTION REQUIRED ---")
    print(f"If you are seeing 'Invalid Domain' error, copy '{redirect_uri}'")
    print("and paste it into your OAuth provider's Authorized Redirect URIs list.")

if __name__ == "__main__":
    check_env()
