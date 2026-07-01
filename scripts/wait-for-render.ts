import "dotenv/config";

async function run() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg";

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json"
  };

  console.log("Waiting for Render deploy to finish...");
  
  while (true) {
    const deploysRes = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys?limit=1`, { headers });
    const deploys = await deploysRes.json() as any[];
    if (deploys && deploys.length > 0) {
      const status = deploys[0].deploy.status;
      console.log(`Status: ${status}`);
      if (status !== "created" && status !== "build_in_progress" && status !== "update_in_progress" && status !== "pre_deploy_in_progress") {
        console.log("Deploy finished with status:", status);
        break;
      }
    }
    await new Promise(r => setTimeout(r, 5000));
  }
}

run().catch(console.error);
