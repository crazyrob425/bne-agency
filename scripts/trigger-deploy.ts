import axios from "axios";
import { readFileSync } from "fs";

const RENDER_API_KEY = readFileSync(".env.render", "utf-8").trim();
const serviceId = "srv-d8vku8j7uimc738irijg";

const headers = {
  Authorization: `Bearer ${RENDER_API_KEY}`,
  "Content-Type": "application/json",
};

async function triggerDeploy() {
  const res = await axios.post(
    `https://api.render.com/v1/services/${serviceId}/deploys`,
    { clearCache: "clear" },
    { headers }
  );
  console.log("Deploy triggered:", res.data.id);
}

triggerDeploy().catch(console.error);
