import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['server.js','package.json','Dockerfile','DATABASE_SCHEMA.sql','public/index.html','public/privacy.html','public/terms.html','mobile/package.json','mobile/capacitor.config.json'];
let ok=true;
for(const f of required){if(!fs.existsSync(path.join(root,f))){console.error('MISSING',f);ok=false}else console.log('OK',f)}
for(const f of ['.env','.env.production']) if(fs.existsSync(path.join(root,f))){console.error('SECRET FILE PRESENT:',f);ok=false}
console.log(ok?'PREFLIGHT PASS':'PREFLIGHT FAIL');
process.exit(ok?0:1);
