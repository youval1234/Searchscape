// Deterministic transport tests: separate devices, asynchronous browser storage,
// delayed delivery and worker restarts. These do not claim Brave server delivery.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const source=fs.readFileSync(path.join(__dirname,'extension/sync.js'),'utf8');
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'extension/manifest.json')));
const key='grPreferencesV1',stateKey='grSyncState',copy=value=>structuredClone(value);
let count=0;
async function check(name,fn){await fn();console.log('PASS '+name);count++;}
function device({local={},sync={}}={}){
 const data={local:copy(local),sync:copy(sync)},listeners=[],timers=new Map();let timerId=0,fail=false,writes=0,scope;
 function area(name){return {
  async get(keys){if(keys===null)return copy(data[name]);const out={};for(const k of Array.isArray(keys)?keys:[keys])if(Object.hasOwn(data[name],k))out[k]=copy(data[name][k]);return out;},
  async set(values){if(name==='sync'){if(fail)throw new Error('Temporary browser write failure');writes++;}const changes={};for(const [k,v]of Object.entries(values)){if(JSON.stringify(data[name][k])!==JSON.stringify(v)){changes[k]={oldValue:copy(data[name][k]),newValue:copy(v)};data[name][k]=copy(v);}}if(Object.keys(changes).length)for(const listener of listeners)listener(copy(changes),name);}
 };}
 const storage={local:area('local'),sync:area('sync'),onChanged:{addListener:fn=>listeners.push(fn)}};
 function boot(){listeners.length=0;timers.clear();scope={URL,TextEncoder,console,chrome:{storage,runtime:{id:'lhllfnnfbpnoihkfocciliakpjpkplfg',getManifest:()=>manifest}},setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id)};vm.createContext(scope);vm.runInContext(source,scope);}
 async function idle(){for(let n=0;n<5;n++){await scope.SearchscapeSync.request({type:'browserSyncStatus'});await new Promise(setImmediate);}}
 boot();
 return {data,storage,boot,idle,get writes(){return writes;},set fail(value){fail=value;},async request(type='browserSyncNow',extra={}){return copy(await scope.SearchscapeSync.request({type,...extra}));},async flush(){const pending=[...timers.values()];timers.clear();for(const fn of pending)fn();await idle();}};
}
const bundle=(at,preferences)=>({schema:1,at,preferences});
(async()=>{
 await check('The release pins a valid public key and a path-independent extension ID',async()=>{
  assert.ok(manifest.key,'Missing manifest key: copies loaded from different folders have different sync identities');
  crypto.createPublicKey({key:Buffer.from(manifest.key,'base64'),type:'spki',format:'der'});
  const id=crypto.createHash('sha256').update(Buffer.from(manifest.key,'base64')).digest('hex').slice(0,32).replace(/[0-9a-f]/g,c=>String.fromCharCode(97+parseInt(c,16)));
  assert.equal(id,'lhllfnnfbpnoihkfocciliakpjpkplfg');
 });
 await check('Sync stays opt-in and reports identity without claiming server delivery',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora'}}});await a.flush();assert.equal(a.writes,0);
  const status=await a.request('browserSyncStatus');assert.equal(status.data.enabled,false);assert.equal(status.data.stableIdentity,true);
 });
 await check('Two devices automatically publish and receive allowed settings after opting in',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora',appearance:'dark',note:'Private',name:'Private',city:{latitude:1},searxngInstance:'https://private.test/'}}});
  await a.request('browserSyncEnable',{enabled:true});
  const sent=a.data.sync[key];assert.equal(sent.preferences.theme,'aurora');for(const field of ['note','name','city','searxngInstance'])assert.equal(Object.hasOwn(sent.preferences,field),false);
  const b=device({local:{stillSettings:{theme:'solar',note:'Keep on B'}},sync:a.data.sync});await b.request('browserSyncEnable',{enabled:true});
  assert.equal(b.data.local.stillSettings.theme,'aurora');assert.equal(b.data.local.stillSettings.note,'Keep on B');
  await a.storage.local.set({stillSettings:{...a.data.local.stillSettings,font:'outfit'}});await a.flush();
  await b.storage.sync.set(a.data.sync);await b.flush();assert.equal(b.data.local.stillSettings.font,'outfit');
 });
 await check('Incoming updates retain unsent local edits and republish the merged settings',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora',font:'inter'}}});await a.request('browserSyncEnable',{enabled:true});
  const at=a.data.sync[key].at;
  await a.storage.local.set({stillSettings:{theme:'solar',font:'inter'}});
  await a.storage.sync.set({[key]:bundle(at+10,{theme:'aurora',font:'outfit'})});await a.flush();
  assert.equal(a.data.local.stillSettings.theme,'solar');assert.equal(a.data.local.stillSettings.font,'outfit');
  assert.equal(a.data.sync[key].preferences.theme,'solar');assert.equal(a.data.sync[key].preferences.font,'outfit');assert.ok(a.data.sync[key].at>at+10);
 });
 await check('An identical newer delivery advances the clock and rejects older settings',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora'}}});await a.request('browserSyncEnable',{enabled:true});const at=a.data.sync[key].at;
  await a.storage.sync.set({[key]:bundle(at+100,{theme:'aurora'})});await a.idle();assert.equal(a.data.local[stateKey].lastStamp,at+100);
  await a.storage.sync.set({[key]:bundle(at+50,{theme:'solar'})});await a.flush();assert.equal(a.data.local.stillSettings.theme,'aurora');
 });
 await check('Worker restart preserves local edits and merges an update delivered while asleep',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora',font:'inter'}}});await a.request('browserSyncEnable',{enabled:true});const at=a.data.sync[key].at;
  a.data.local.stillSettings.theme='solar';a.data.sync[key]=bundle(at+20,{theme:'aurora',font:'outfit'});a.boot();await a.flush();
  assert.equal(a.data.local.stillSettings.theme,'solar');assert.equal(a.data.local.stillSettings.font,'outfit');assert.equal(a.data.sync[key].preferences.theme,'solar');
 });
 await check('A failed browser write retries without discarding local edits',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora',font:'inter'}}});await a.request('browserSyncEnable',{enabled:true});const at=a.data.sync[key].at;
  a.fail=true;await a.storage.local.set({stillSettings:{theme:'solar',font:'inter'}});await a.flush();assert.match(a.data.local[stateKey].error,/Temporary/);
  a.fail=false;a.data.sync[key]=bundle(at+10,{theme:'aurora',font:'outfit'});await a.request();assert.equal(a.data.sync[key].preferences.theme,'solar');assert.equal(a.data.sync[key].preferences.font,'outfit');assert.equal(a.data.local[stateKey].error,'');
 });
 await check('Private-only edits and disabled sync never publish preference changes',async()=>{
  const a=device({local:{stillSettings:{theme:'aurora'}}});await a.request('browserSyncEnable',{enabled:true});await a.flush();const before=a.writes;
  await a.storage.local.set({stillSettings:{theme:'aurora',note:'Local'}});await a.flush();assert.equal(a.writes,before);
  await a.request('browserSyncEnable',{enabled:false});await a.storage.local.set({stillSettings:{theme:'solar'}});await a.flush();assert.equal(a.writes,before);
 });
 await check('Newer schema data is left intact and asks for an extension update',async()=>{
  const next={schema:2,at:100,preferences:{theme:'aurora'}};const a=device({local:{stillSettings:{theme:'solar'}},sync:{[key]:next}});await a.request('browserSyncEnable',{enabled:true});
  assert.deepEqual(a.data.sync[key],next);assert.equal(a.writes,0);assert.match(a.data.local[stateKey].error,/Update Searchscape/);
 });
 console.log(`${count} sync regression checks passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
