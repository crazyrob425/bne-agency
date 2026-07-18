import "dotenv/config";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json", "Content-Type": "application/json" };
const ac = new AbortController(); const t = setTimeout(()=>ac.abort(), 20000);
const body = { name: "bne-agency-db", databaseName: "bne_agency", user: "bne", plan: "free", region: "oregon", postgresMajorVersion: 16 };
const probe = async (method, path) => {
  try {
    const r = await fetch(`https://api.render.com/v1${path}`, { method, headers, body: JSON.stringify(body), signal: ac.signal });
    const txt = await r.text();
    return `${method} ${path} -> ${r.status} | ${txt.slice(0,160)}`;
  } catch(e){ return `${method} ${path} -> ERR ${e.message}`; }
};
try {
  console.log(await probe("POST", "/postgres"));
  console.log(await probe("POST", "/databases/postgres"));
  console.log(await probe("GET",  "/postgres"));
  // maybe needs ownerId from account
  const me = await fetch(`https://api.render.com/v1/owners`, { headers, signal: ac.signal });
  console.log("owners ->", me.status, (await me.text()).slice(0,200));
} catch(e){ console.error("ERR", e.message); }
finally { clearTimeout(t); }
