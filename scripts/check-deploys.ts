import axios from "axios";
import { readFileSync } from "fs";

const RENDER_API_KEY = readFileSync(".env.render", "utf-8").trim();
const serviceId = "srv-d8vku8j7uimc738irijg";

const headers = {
  Authorization: `Bearer ${RENDER_API_KEY}`,
  Accept: "application/json",
};

async function checkLastSuccessful() {
  const res = await axios.get(
    `https://api.render.com/v1/services/${serviceId}/deploys?limit=10`,
    { headers }
  );
  const deploys = res.data;
  for (const d of deploys) {
    const status = d.deploy.status;
    const msg = d.deploy.commit?.message?.substring(0, 70) || 'no message';
    const id = d.deploy.id;
    console.log(`${id}: ${status} - ${msg}`);
  }
}

checkLastSuccessful().catch(console.error);
