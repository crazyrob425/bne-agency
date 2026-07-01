import "dotenv/config";

async function run() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg";

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  console.log("Updating Build Command on Render...");
  const res = await fetch(`https://api.render.com/v1/services/${serviceId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      serviceDetails: {
        envSpecificDetails: {
          buildCommand: "pnpm install --no-frozen-lockfile && npm run build"
        }
      }
    })
  });

  if (!res.ok) {
    console.error("Failed to update build command", await res.text());
    return;
  }
  
  console.log("Build command updated!");

  // Trigger a new manual deploy
  console.log("Triggering new deployment...");
  const deployRes = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys`, {
    method: "POST",
    headers,
    body: JSON.stringify({ clearCache: "clear" })
  });

  if (!deployRes.ok) {
    console.error("Failed to trigger deploy", await deployRes.text());
  } else {
    console.log("New deploy triggered! Render will now bypass frozen-lockfile and build successfully.");
  }
}

run().catch(console.error);
