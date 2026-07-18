import "dotenv/config";
import { readFileSync } from "node:fs";
import postgres from "postgres";
const base = readFileSync("scripts/.db-conn.txt", "utf8").trim();
const url = base + "?sslmode=require";
console.error("connecting...");
const sql = postgres(url, { max: 1, connect_timeout: 12, idle_timeout: 2 });
try {
  const r = await sql`select version()`;
  console.log("CONNECTED:", r[0].version.slice(0, 40));
  const t = await sql`select count(*)::int as n from information_schema.tables where table_schema='public'`;
  console.log("existing public tables:", t[0].n);
  process.exit(0);
} catch (e) {
  console.error("CONNECT FAILED:", e.code || e.message);
  process.exit(1);
}
