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
  const auth=token=>({authorization:`Bearer ${token}`});
  const register=async(name)=>{
    const rr=await req('/api/auth/register',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email:`${name.toLowerCase().replace(/\\s+/g,'-')}-${Date.now()}@example.com`,password:'StrongPass123!'})});
    if(!rr.ok) throw new Error(name+' register failed: '+await rr.text());
    return rr.json();
  };
  const sender=data;
  const creator=await register('Smoke Creator');
  const third=await register('Smoke Third');

  r=await req('/api/wallet/test-topup',{method:'POST',headers:{...auth(sender.token),'content-type':'application/json'},body:JSON.stringify({coins:10})});
  if(!r.ok) throw new Error('test topup failed: '+await r.text());

  r=await req('/api/gifts',{method:'POST',headers:{...auth(sender.token),'content-type':'application/json'},body:JSON.stringify({creatorId:creator.user.id,coins:10})});
  if(!r.ok) throw new Error('gift transfer failed: '+await r.text());

  r=await req('/api/wallet',{headers:auth(creator.token)});
  if(!r.ok) throw new Error('creator wallet failed');
  const creatorWallet=await r.json();
  if(Number(creatorWallet.coins)!==7 || Number(creatorWallet.creatorEarningsCoins)!==7) throw new Error('creator earnings accounting failed');

  r=await req('/api/gifts',{method:'POST',headers:{...auth(creator.token),'content-type':'application/json'},body:JSON.stringify({creatorId:third.user.id,coins:1})});
  if(r.status!==400) throw new Error('creator earnings were incorrectly spendable');

  console.log('Zelqora smoke test passed');
} finally {child.kill('SIGTERM');}
