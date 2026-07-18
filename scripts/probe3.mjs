import "dotenv/config";
const OWNER = "tea-d8vkqqrtqb8s73etqfeg";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json", "Content-Type": "application/json" };
const ac = new AbortController(); const t = setTimeout(()=>ac.abort(), 20000);
const body = { name: "bne-agency-db", databaseName: "bne_agency", user: "bne", plan: "free", region: "oregon", postgresMajorVersion: 16, ownerId: OWNER };
const r = await fetch(`https://api.render.com/v1/postgres`, { method: "POST", headers, body: JSON.stringify(body), signal: ac.signal });
console.log("status:", r.status);
console.log((await r.text()).slice(0, 400));
clearTimeout(t);
