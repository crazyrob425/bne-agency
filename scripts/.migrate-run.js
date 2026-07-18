const fs = require('fs');
require('dotenv').config();
process.env.DATABASE_URL = fs.readFileSync('scripts/.db-conn.txt','utf8').trim() + '?sslmode=require';
require('child_process').execFileSync('npx', ['drizzle-kit', 'migrate'], { stdio: 'inherit', env: process.env, cwd: 'E:\\bne-agency' });
