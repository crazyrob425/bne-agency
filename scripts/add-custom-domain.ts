import "dotenv/config";

async function run() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg";

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const domains = ["blacklisted.studio", "www.blacklisted.studio"];

  for (const domain of domains) {
    console.log(`Adding ${domain} to Render service...`);
    const res = await fetch(`https://api.render.com/v1/services/${serviceId}/custom-domains`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: domain })
    });

    if (!res.ok) {
      console.error(`Failed to add ${domain}`, await res.text());
    } else {
      console.log(`Successfully added ${domain}!`);
    }
  }
}

run().catch(console.error);
