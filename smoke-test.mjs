import {spawn} from 'node:child_process';
const port=3137; const base=`http://127.0.0.1:${port}`;
const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:String(port),NODE_ENV:'test',JWT_SECRET:'smoke-test-secret-change-me'}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function req(path,opts={}){for(let i=0;i<30;i++){try{return await fetch(base+path,opts)}catch{await sleep(100)}}throw new Error('server unavailable')}
try{
  let r=await req('/api/health'); if(!r.ok) throw new Error('health failed');
  r=await req('/api/ready'); if(!r.ok) throw new Error('ready failed');
  r=await req('/api/auth/register',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:'Smoke Test',email:`smoke-${Date.now()}@example.com`,password:'StrongPass123!'})});
  if(!r.ok) throw new Error('register failed: '+await r.text());
  const data=await r.json();
  r=await req('/api/me',{headers:{authorization:`Bearer ${data.token}`}}); if(!r.ok) throw new Error('me failed');
  console.log('Zelqora smoke test passed');
} finally {child.kill('SIGTERM');}
