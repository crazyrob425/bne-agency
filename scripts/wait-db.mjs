import "dotenv/config";
const ID = "dpg-d9d9hevaqgkc7383mhhg-a";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json" };
const ac = new AbortController(); const t = setTimeout(()=>ac.abort(), 240000); // 4 min
let conn = null;
for (let i=0;i<50;i++){
  const rr = await fetch(`https://api.render.com/v1/postgres/${ID}`, { headers, signal: ac.signal });
  const jj = await rr.json();
  conn = jj.postgres?.connectionDetails?.connectionString || jj.connectionDetails?.connectionString;
  const st = jj.postgres?.status || jj.status;
  console.error(`poll ${i}: ${st} conn=${conn?"ready":"pending"}`);
  if (conn) break;
  await new Promise(r=>setTimeout(r,8000));
}
if(!conn){ console.error("timeout waiting for connection string"); process.exit(1); }
try { const u=new URL(conn); console.log("DB_HOST=" + u.hostname + ":" + (u.port||"")); } catch { console.log("DB_HOST=<unparseable>"); }
const fs = await import("node:fs");
fs.writeFileSync("scripts/.db-conn.txt", conn);
clearTimeout(t);
