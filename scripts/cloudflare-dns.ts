

const EMAIL = process.env.CF_EMAIL || "blacklistedrob@gmail.com";
const TOKEN = process.env.CF_API_KEY || "";
const DOMAIN = "blacklisted.studio";
const TARGET = "bne-agency-site.onrender.com";

async function run() {
  console.log("🚀 Starting Cloudflare DNS Automation...");

  // Try Bearer token first, fallback to Global API Key
  const headersBearer = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
  };
  const headersGlobal = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": TOKEN,
    "Content-Type": "application/json"
  };

  let headers = headersBearer;
  
  // 1. Get Zone ID
  console.log(`Fetching Zone ID for ${DOMAIN}...`);
  let res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, { headers });
  let data = await res.json() as any;

  if (!data.success) {
    console.log("Bearer token failed, trying Global API Key...");
    headers = headersGlobal;
    res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, { headers });
    data = await res.json() as any;
  }

  if (!data.success || data.result.length === 0) {
    console.error("Failed to find zone:", data.errors);
    process.exit(1);
  }

  const zoneId = data.result[0].id;
  console.log(`✅ Found Zone ID: ${zoneId}`);

  // 2. Fetch existing records
  console.log("Fetching existing DNS records...");
  const recordsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, { headers });
  const recordsData = await recordsRes.json() as any;

  if (recordsData.success) {
    for (const record of recordsData.result) {
      if (
        (record.name === DOMAIN || record.name === `www.${DOMAIN}`) &&
        ["A", "AAAA", "CNAME", "ALIAS"].includes(record.type)
      ) {
        console.log(`Deleting existing record: ${record.type} ${record.name}`);
        await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`, {
          method: "DELETE",
          headers
        });
      }
    }
  }

  // 3. Create Root CNAME
  console.log("Creating CNAME for root...");
  const rootRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "CNAME",
      name: DOMAIN,
      content: TARGET,
      ttl: 1, // Auto
      proxied: false // DNS Only (Lets Render issue SSL)
    })
  });
  const rootData = await rootRes.json() as any;
  if (rootData.success) {
    console.log("✅ Root CNAME created successfully!");
  } else {
    console.error("❌ Failed to create Root CNAME:", rootData.errors);
  }

  // 4. Create WWW CNAME
  console.log("Creating CNAME for www...");
  const wwwRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      type: "CNAME",
      name: `www.${DOMAIN}`,
      content: TARGET,
      ttl: 1, // Auto
      proxied: false // DNS Only
    })
  });
  const wwwData = await wwwRes.json() as any;
  if (wwwData.success) {
    console.log("✅ WWW CNAME created successfully!");
  } else {
    console.error("❌ Failed to create WWW CNAME:", wwwData.errors);
  }

  console.log("🎉 Cloudflare DNS automation complete!");
}

run().catch(console.error);
