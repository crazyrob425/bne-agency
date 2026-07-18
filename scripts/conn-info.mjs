import "dotenv/config";
const ID = "dpg-d9d9hevaqgkc7383mhhg-a";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json" };
const paths = ["/connection-info", "/connectionInfo", "/connection", "/credentials"];
for (const p of paths) {
  try {
    const r = await fetch(`https://api.render.com/v1/postgres/${ID}${p}`, { headers });
    const t = await r.text();
    console.log(`GET ${p} -> ${r.status}`);
    if (r.ok) console.log(t.slice(0, 500));
  } catch(e){ console.log(`GET ${p} -> ERR ${e.message}`); }
}
