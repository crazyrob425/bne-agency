import "dotenv/config";
import { writeFileSync } from "node:fs";
const ID = "dpg-d9d9hevaqgkc7383mhhg-a";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json" };
const r = await fetch(`https://api.render.com/v1/postgres/${ID}/connection-info`, { headers });
const j = await r.json();
const ext = j.externalConnectionString;
// print ONLY host:port (no user/password)
try { const u = new URL(ext); console.log("DB_HOST=" + u.hostname + ":" + (u.port||"")); } catch { console.log("DB_HOST=<unparseable>"); }
writeFileSync("scripts/.db-conn.txt", ext);
console.log("saved connection string to scripts/.db-conn.txt (local only)");
