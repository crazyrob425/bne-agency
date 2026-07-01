import axios from "axios";
import { readFileSync } from "fs";

const RENDER_API_KEY = readFileSync(".env.render", "utf-8").trim();
const serviceId = "srv-d8vku8j7uimc738irijg";
const targetDeployId = process.argv[2];

const headers = {
  Authorization: `Bearer ${RENDER_API_KEY}`,
  Accept: "application/json",
};

async function waitForLive() {
  let attempts = 0;
  while (attempts < 120) {
    attempts++;
    try {
      const res = await axios.get(
        `https://api.render.com/v1/services/${serviceId}/deploys?limit=5`,
        { headers }
      );
      const deploys = res.data;
      const target = deploys.find((d: any) => d.deploy.id === targetDeployId);
      
      if (target) {
        const status = target.deploy.status;
        process.stdout.write(`[${new Date().toISOString()}] ${status}\n`);
        
        if (status === "live") {
          console.log("Deploy is LIVE!");
          return;
        }
        if (["deactivated", "build_failed", "canceled"].includes(status)) {
          console.error(`Failed: ${status}`);
          process.exit(1);
        }
      }
    } catch (e: any) {
      process.stdout.write(`Error: ${e.message}\n`);
    }
    await new Promise((r) => setTimeout(r, 10000));
  }
  console.error("Timeout");
  process.exit(1);
}

waitForLive().catch(console.error);
