const EMAIL = process.env.CF_EMAIL || "blacklistedrob@gmail.com";
const TOKEN = process.env.CF_API_KEY || "";
const DOMAIN = "blacklisted.studio";

async function check() {
  const headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": TOKEN,
    "Content-Type": "application/json"
  };
  
  let res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, { headers });
  let data = await res.json() as any;
  const zoneId = data.result[0].id;

  const recordsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, { headers });
  const recordsData = await recordsRes.json() as any;
  
  console.log("Current DNS Records:");
  for (const record of recordsData.result) {
    if (record.name.includes(DOMAIN)) {
      console.log(`- ${record.type} ${record.name} -> ${record.content} (Proxied: ${record.proxied})`);
    }
  }
}

check().catch(console.error);
