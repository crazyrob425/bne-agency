const fs = require('fs');
const src = fs.readFileSync('client/src/data/nicheDatabase.ts','utf8');
const re = /keyword:\s*\"([^\"]+)\"[\s\S]*?category:\s*\"([^\"]+)\"[\s\S]*?earningPotential:\s*\"([^\"]+)\"/g;
let m, out = [];
const seen = new Set();
while ((m = re.exec(src))) {
  const key = m[1];
  if (seen.has(key)) continue;
  seen.add(key);
  out.push({ keyword: m[1], category: m[2], earningPotential: m[3] });
}
console.log('parsed', out.length);
fs.mkdirSync('server/_core', { recursive: true });
fs.writeFileSync('server/_core/nicheSnapshot.json', JSON.stringify(out));
const top = out.filter(n => n.earningPotential === 'very-high' || n.earningPotential === 'high');
console.log('top-earning', top.length);
