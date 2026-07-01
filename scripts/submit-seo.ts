import "dotenv/config";
import axios from "axios";

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const serviceId = "srv-d8vku8j7uimc738irijg";
const SITEMAP_URL = "https://blacklisted.studio/sitemap.xml";

async function submitSeo() {
  if (!RENDER_API_KEY) {
    console.error("❌ Error: RENDER_API_KEY is not defined in the environment.");
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  console.log("🚀 Starting SEO Deployment & Indexing Submission Pipeline (via Axios)...");

  // 1. Trigger fresh deploy
  console.log("📦 Triggering Render build & deploy...");
  let deployId: string;
  try {
    const deployTriggerRes = await axios.post(
      `https://api.render.com/v1/services/${serviceId}/deploys`,
      {
        clearCache: "clear", // Ensure a clean build
      },
      { headers }
    );
    const activeDeploy = deployTriggerRes.data;
    deployId = activeDeploy.id;
    console.log(`✅ Deploy successfully triggered! Deploy ID: ${deployId}`);
  } catch (err: any) {
    const status = err.response?.status;
    const errorData = err.response?.data;
    console.error(`❌ Failed to trigger Render deploy (Status ${status}):`, errorData || err.message);
    process.exit(1);
  }

  // 2. Poll until build is live
  console.log("⏳ Waiting for the Render deploy to compile and go live...");
  
  let attempts = 0;
  const maxAttempts = 120; // Up to 10 minutes (5s intervals)
  
  while (attempts < maxAttempts) {
    attempts++;
    try {
      const deploysRes = await axios.get(
        `https://api.render.com/v1/services/${serviceId}/deploys?limit=5`,
        { headers }
      );
      
      const deploys = deploysRes.data as any[];
      const currentDeploy = deploys.find((d: any) => d.deploy.id === deployId);
      
      if (currentDeploy) {
        const status = currentDeploy.deploy.status;
        console.log(`   [Attempt ${attempts}] Status: ${status}`);
        
        if (status === "live") {
          console.log("🎉 Production deployment is LIVE on Render!");
          break;
        }
        
        if (status === "deactivated" || status === "build_failed" || status === "canceled") {
          console.error(`❌ Deploy terminated with bad status: ${status}`);
          process.exit(1);
        }
      } else {
        // Fallback: check the latest deploy
        if (deploys.length > 0) {
          const latestStatus = deploys[0].deploy.status;
          console.log(`   [Attempt ${attempts}] Latest Deploy Status: ${latestStatus}`);
          if (latestStatus === "live") {
            console.log("🎉 Latest production deployment went live!");
            break;
          }
        }
      }
    } catch (e: any) {
      console.warn(`⚠️ Warning: Network issue querying deploy state: ${e.message}`);
    }

    await new Promise((r) => setTimeout(r, 5000));
  }

  if (attempts >= maxAttempts) {
    console.error("❌ Timeout waiting for Render build to complete.");
    process.exit(1);
  }

  // 3. Ping Google and Bing
  console.log("📡 Pinging search engine sitemap registration APIs...");

  try {
    const googlePing = await axios.get(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    );
    if (googlePing.status === 200) {
      console.log("✅ Successfully pinged Google indexers!");
    } else {
      console.warn(`⚠️ Google ping returned status: ${googlePing.status}`);
    }
  } catch (err: any) {
    console.error(`❌ Failed to ping Google: ${err.message}`);
  }

  try {
    const bingPing = await axios.get(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    );
    if (bingPing.status === 200) {
      console.log("✅ Successfully pinged Bing indexers!");
    } else {
      console.warn(`⚠️ Bing ping returned status: ${bingPing.status}`);
    }
  } catch (err: any) {
    console.error(`❌ Failed to ping Bing: ${err.message}`);
  }

  console.log("🌟 SEO Submission Pipeline Completed Successfully!");
}

submitSeo().catch(console.error);
