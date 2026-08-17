import "dotenv/config";

async function run() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg";

  if (!RENDER_API_KEY) {
    console.error("RENDER_API_KEY not found in .env");
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // First, get current env vars
  console.log("Fetching current environment variables...");
  const getRes = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
    headers
  });

  if (!getRes.ok) {
    console.error("Failed to fetch env vars:", await getRes.text());
    process.exit(1);
  }

  const currentEnvVars = await getRes.json();
  console.log(`Found ${currentEnvVars.length} existing env vars`);

  // Update/create specific env vars we need
  const updates = [
    { key: "VITE_MEDIA_BASE_URL", value: "https://pub-df51268806e8c23ac9ca55742055acc4.r2.dev" },
    { key: "R2_ACCOUNT_ID", value: "df51268806e8c23ac9ca55742055acc4" },
    { key: "R2_BUCKET_NAME", value: "blacklisted-studio-media" },
    { key: "VITE_SITE_URL", value: "https://blacklisted.studio" },
    { key: "SITE_URL", value: "https://blacklisted.studio" },
  ];

  // Filter out empty keys and build the payload
  const existingKeys = new Set(currentEnvVars.filter((v: any) => v.key).map((v: any) => v.key));
  const allEnvVars = currentEnvVars.filter((v: any) => v.key);

  for (const update of updates) {
    const existingIndex = allEnvVars.findIndex((v: any) => v.key === update.key);
    if (existingIndex >= 0) {
      allEnvVars[existingIndex] = { ...allEnvVars[existingIndex], value: update.value };
    } else {
      allEnvVars.push({
        key: update.key,
        value: update.value,
        type: "plain"
      });
    }
  }

  console.log("Updating environment variables...");
  const putRes = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
    method: "PUT",
    headers,
    body: JSON.stringify(allEnvVars)
  });

  if (!putRes.ok) {
    console.error("Failed to update env vars:", await putRes.text());
    process.exit(1);
  }

  const result = await putRes.json();
  console.log("Environment variables updated successfully!");
  console.log("Updated keys:", updates.map(u => u.key).join(", "));

  // Trigger a deploy
  console.log("\nTriggering new deploy...");
  const deployRes = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys`, {
    method: "POST",
    headers,
    body: JSON.stringify({ clearCache: "clear" })
  });

  if (!deployRes.ok) {
    console.error("Failed to trigger deploy:", await deployRes.text());
    process.exit(1);
  }

  const deployResult = await deployRes.json();
  console.log("Deploy triggered successfully!");
  console.log("Deploy ID:", deployResult.id || deployResult.deploy?.id);
  console.log("\nNext steps:");
  console.log("1. Fix your Cloudflare API token in .env (current token is invalid)");
  console.log("2. Run: python scripts/sync-to-r2.py");
  console.log("3. Check Render dashboard for deploy status");
}

run().catch(console.error);
