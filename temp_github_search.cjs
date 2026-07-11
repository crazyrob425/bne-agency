const https = require('https');
const url = 'https://api.github.com/search/repositories?q=quiz+engine+react+typescript+recommendation+algorithm+stars:%3E100&sort=stars&order=desc&per_page=15';
https.get(url, { headers: { 'User-Agent': 'VSCode-AI', 'Accept': 'application/vnd.github+json' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (!json.items) throw new Error(JSON.stringify(json));
      json.items.slice(0, 10).forEach((item, index) => {
        console.log(`${index+1}. ${item.full_name} | ⭐ ${item.stargazers_count} | ${item.html_url}`);
        console.log(`   ${item.description}`);
      });
    } catch (err) {
      console.error('PARSE ERROR', err.message);
      console.error(data);
    }
  });
}).on('error', err => console.error('REQUEST ERROR', err.message));
