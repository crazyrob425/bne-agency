import "dotenv/config";

async function run() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg";

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  console.log("Fetching current environment variables from Render...");
  const getRes = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
    headers: { Authorization: `Bearer ${RENDER_API_KEY}`, Accept: "application/json" }
  });

  if (!getRes.ok) {
    console.error("Failed to fetch current env vars", await getRes.text());
    return;
  }

  const currentEnvVarsRaw = await getRes.json() as any[];
  const currentEnvVars = currentEnvVarsRaw.map((item: any) => ({
    key: item.envVar.key,
    value: item.envVar.value
  }));

  const updates = {
    "NODE_VERSION": "20",
    "PNPM_VERSION": "10.4.1",
    "NODE_OPTIONS": "--max_old_space_size=1536"
  };

  const mergedEnvVars = [...currentEnvVars];
  for (const [key, value] of Object.entries(updates)) {
    const existing = mergedEnvVars.find(ev => ev.key === key);
    if (existing) {
      existing.value = value;
    } else {
      mergedEnvVars.push({ key, value });
    }
  }

  console.log("Updating environment variables on Render with merged configurations...");
  const res = await fetch(`https://api.render.com/v1/services/${serviceId}/env-vars`, {
    method: "PUT",
    headers,
    body: JSON.stringify(mergedEnvVars)
  });

  if (!res.ok) {
    console.error("Failed to update env vars", await res.text());
    return;
  }
  
  console.log("Env vars updated!");

  // Trigger a new manual deploy
  console.log("Triggering new deployment...");
  const deployRes = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys`, {
    method: "POST",
    headers,
    body: JSON.stringify({ clearCache: "clear" }) // Clear cache to ensure it uses the new PNPM version
  });

  if (!deployRes.ok) {
    console.error("Failed to trigger deploy", await deployRes.text());
  } else {
    console.log("New deploy triggered! Render will now rebuild with the correct PNPM version and memory limits.");
  }
}

run().catch(console.error);
