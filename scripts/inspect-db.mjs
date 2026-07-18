import "dotenv/config";
const ID = "dpg-d9d9hevaqgkc7383mhhg-a";
const headers = { Authorization: `Bearer ${process.env.RENDER_API_KEY}`, Accept: "application/json" };
const r = await fetch(`https://api.render.com/v1/postgres/${ID}`, { headers });
const j = await r.json();
console.log(JSON.stringify(j.postgres || j, null, 2).slice(0, 1500));
