import "dotenv/config";
import fs from "fs";

async function main() {
  const token = process.env.CLOUDFLARE_TOKEN || "";
  console.log("token_prefix:", token.slice(0, 10) + "...", "length:", token.length);

  // Test 1: Token verify
  console.log("\n--- Token Verify ---");
  const verifyRes = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  console.log("status:", verifyRes.status, "success:", verifyData.success, "errors:", JSON.stringify(verifyData.errors));

  // Test 2: List R2 buckets
  const accountId = process.env.R2_ACCOUNT_ID || "";
  console.log("\n--- List R2 Buckets ---");
  const bucketRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const bucketData = await bucketRes.json();
  console.log("status:", bucketRes.status, "success:", bucketData.success, "errors:", JSON.stringify(bucketData.errors));
  if (bucketData.success) {
    console.log("buckets:", bucketData.result.map((b: any) => b.name));
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
