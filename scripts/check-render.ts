import "dotenv/config";

async function check() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg"; // Got this from earlier logs

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json"
  };

  console.log("Checking Service details...");
  const serviceRes = await fetch(`https://api.render.com/v1/services/${serviceId}`, { headers });
  const service = await serviceRes.json();
  console.log("Service status:", (service as any).serviceDetails?.suspended || "Active", "- suspended state");

  console.log("Checking recent deploys...");
  const deploysRes = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys?limit=1`, { headers });
  if (!deploysRes.ok) {
     console.log("Deploys API error:", await deploysRes.text());
  } else {
    const deploys = await deploysRes.json() as any[];
    if (deploys && deploys.length > 0) {
      console.log(`Latest deploy status: ${deploys[0].deploy.status}`);
      console.log(JSON.stringify(deploys[0].deploy, null, 2));
    }
  }
}

check().catch(console.error);
