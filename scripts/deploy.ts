import "dotenv/config";


async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deploy() {
  const RENDER_API_KEY = process.env.RENDER_API_KEY;
  const NAMECOM_USER = process.env.NAMECOM_USER;
  const NAMECOM_TOKEN = process.env.NAMECOM_TOKEN;
  const DOMAIN = process.env.TARGET_DOMAIN || "blacklisted.studio";
  
  if (!RENDER_API_KEY || !NAMECOM_USER || !NAMECOM_TOKEN) {
    console.error("Missing API keys in environment!");
    process.exit(1);
  }

  console.log("🚀 Starting Automated Deployment to Render and Name.com...");

  // 1. Get Render Owner ID
  console.log("Fetching Render account details...");
  const ownerRes = await fetch("https://api.render.com/v1/owners", {
    headers: { Authorization: `Bearer ${RENDER_API_KEY}`, Accept: "application/json" }
  });
  const owners = await ownerRes.json() as any[];
  if (!owners || owners.length === 0) {
    console.error("Failed to get Render owners", owners);
    process.exit(1);
  }
  const ownerId = owners[0].owner.id;
  console.log(`✅ Render Owner ID: ${ownerId}`);

  // 2. Create Render Web Service
  console.log("Creating Render Web Service...");
  const serviceRes = await fetch("https://api.render.com/v1/services", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RENDER_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "web_service",
      name: "bne-agency-site",
      ownerId: ownerId,
      repo: "https://github.com/crazyrob425/bne-agency",
      autoDeploy: "yes",
      branch: "main",
      serviceDetails: {
        env: "node",
        region: "oregon",
        plan: "free",
        envSpecificDetails: {
          buildCommand: "npm run build",
          startCommand: "npm run start"
        }
      }
    })
  });

  let service: any = await serviceRes.json();
  if (serviceRes.status !== 201) {
    // Maybe it already exists? Try to find it.
    if (service.message && (service.message.includes("already exists") || service.message.includes("already in use"))) {
       console.log("Service might already exist, fetching existing services...");
       const listRes = await fetch(`https://api.render.com/v1/services?limit=20`, {
         headers: { Authorization: `Bearer ${RENDER_API_KEY}`, Accept: "application/json" }
       });
       const list = await listRes.json() as any[];
       service = list.find((s: any) => s.service.name === "bne-agency-site");
       if (!service) {
         console.error("Could not find existing service either.", list);
         process.exit(1);
       }
    } else {
       console.error("Failed to create Render service:", service);
       process.exit(1);
    }
  }
  
  const serviceId = service.service ? service.service.id : service.id;
  let renderUrl = service.service ? service.service.url : service.url;
  if (!renderUrl) {
    console.log("Service object:", JSON.stringify(service, null, 2));
    renderUrl = `https://${service.service ? service.service.slug : service.slug}.onrender.com`;
  }
  const renderHostname = new URL(renderUrl).hostname;
  console.log(`✅ Render Service Created! ID: ${serviceId}`);
  console.log(`✅ Internal Render URL: ${renderHostname}`);

  // 3. Attach Custom Domain to Render Service
  console.log(`Attaching custom domain ${DOMAIN} to Render...`);
  const attachRes = await fetch(`https://api.render.com/v1/services/${serviceId}/customDomains`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RENDER_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: DOMAIN })
  });
  
  // Also attach www
  const attachWwwRes = await fetch(`https://api.render.com/v1/services/${serviceId}/customDomains`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RENDER_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: `www.${DOMAIN}` })
  });
  
  console.log("✅ Custom Domains attached to Render.");

  // 4. Update Name.com DNS Records
  console.log(`Configuring Name.com DNS for ${DOMAIN}...`);
  const nameComAuth = Buffer.from(`${NAMECOM_USER}:${NAMECOM_TOKEN}`).toString("base64");
  
  // We need to create an ANAME record for root, and CNAME for www
  // Delete existing A/CNAME records if any (simplified)
  console.log("Fetching existing Name.com records...");
  const recordsRes = await fetch(`https://api.name.com/v4/domains/${DOMAIN}/records`, {
    headers: { Authorization: `Basic ${nameComAuth}` }
  });
  
  const recordsData = await recordsRes.json() as any;
  if (recordsData.records) {
    for (const record of recordsData.records) {
      if ((record.host === "" && record.type === "A") || 
          (record.host === "" && record.type === "ANAME") ||
          (record.host === "www" && record.type === "CNAME")) {
        console.log(`Deleting old record: ${record.type} ${record.host || '@'}`);
        await fetch(`https://api.name.com/v4/domains/${DOMAIN}/records/${record.id}`, {
          method: "DELETE",
          headers: { Authorization: `Basic ${nameComAuth}` }
        });
      }
    }
  }

  // Create ANAME for root
  console.log("Creating ANAME record for root...");
  const anameRes = await fetch(`https://api.name.com/v4/domains/${DOMAIN}/records`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${nameComAuth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      domainName: DOMAIN,
      host: "",
      type: "ANAME",
      answer: renderHostname,
      ttl: 300
    })
  });
  if (!anameRes.ok) console.error("ANAME error:", await anameRes.text());

  // Create CNAME for www
  console.log("Creating CNAME record for www...");
  const cnameRes = await fetch(`https://api.name.com/v4/domains/${DOMAIN}/records`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${nameComAuth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      domainName: DOMAIN,
      host: "www",
      type: "CNAME",
      answer: renderHostname,
      ttl: 300
    })
  });
  if (!cnameRes.ok) console.error("CNAME error:", await cnameRes.text());

  console.log("✅ Name.com DNS configured successfully!");
  console.log(`🎉 Deployment Process Initiated! Your site will be live at https://${DOMAIN} shortly once Render finishes building.`);
}

deploy().catch(console.error);
