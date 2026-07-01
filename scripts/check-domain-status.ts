import "dotenv/config";

async function run() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const serviceId = "srv-d8vku8j7uimc738irijg";

  const headers = {
    Authorization: `Bearer ${RENDER_API_KEY}`,
    Accept: "application/json"
  };

  const res = await fetch(`https://api.render.com/v1/services/${serviceId}/custom-domains`, {
    headers
  });
  
  if (!res.ok) {
    console.error("Failed", await res.text());
    return;
  }
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
