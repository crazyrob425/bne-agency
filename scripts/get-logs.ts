import axios from "axios";
import { readFileSync } from "fs";

const RENDER_API_KEY = readFileSync(".env.render", "utf-8").trim();
const deployId = "dep-d910kp67r5hc73bklqe0";

const headers = {
  Authorization: `Bearer ${RENDER_API_KEY}`,
  Accept: "application/json",
};

async function getLogs() {
  try {
    const res = await axios.get(
      `https://api.render.com/v1/deploys/${deployId}/logs`,
      { headers }
    );
    console.log("Logs:", JSON.stringify(res.data, null, 2).substring(0, 5000));
  } catch (e: any) {
    console.error("Error:", e.response?.status, e.response?.data || e.message);
  }
}

getLogs().catch(console.error);
