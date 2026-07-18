import "dotenv/config";
const OWNER = "tea-d8vkqqrtqb8s73etqfeg";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json", "Content-Type": "application/json" };
const ac = new AbortController(); const t = setTimeout(()=>ac.abort(), 25000);
const body = { name: "bne-agency-db", databaseName: "bne_agency", user: "bne", plan: "free", region: "oregon", version: "16", ownerId: OWNER };
const r = await fetch(`https://api.render.com/v1/postgres`, { method: "POST", headers, body: JSON.stringify(body), signal: ac.signal });
const j = await r.json();
console.error("status:", r.status);
if (!r.ok) { console.error(JSON.stringify(j)); process.exit(1); }
const dbId = j.postgres?.id || j.id;
console.error("Postgres id:", dbId, "| status:", j.postgres?.status || j.status);
let conn = null;
for (let i=0;i<45;i++){
  const rr = await fetch(`https://api.render.com/v1/postgres/${dbId}`, { headers, signal: ac.signal });
  const jj = await rr.json();
  conn = jj.postgres?.connectionDetails?.connectionString || jj.connectionDetails?.connectionString;
  const st = jj.postgres?.status || jj.status;
  console.error(`poll ${i}: ${st} conn=${conn?"ready":"pending"}`);
  if (conn) break;
  await new Promise(r=>setTimeout(r,8000));
}
if(!conn){ console.error("timeout"); process.exit(1); }
try { const u=new URL(conn); console.log("DB_HOST=" + u.hostname + ":" + (u.port||"")); } catch { console.log("DB_HOST=<unparseable>"); }
const fs = await import("node:fs");
fs.writeFileSync("scripts/.db-conn.txt", conn);
clearTimeout(t);
