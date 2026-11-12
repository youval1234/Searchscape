// Native Brave API and homepage integration, with explicit simulated delivery.
// Folder identity is real; this test does not connect to a Brave Sync server.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=__dirname,temporary=fs.mkdtempSync(path.join(root,'.test-profile-sync-')),contexts=[];
async function launch(folder,profile){
 const ext=path.join(temporary,folder);fs.cpSync(path.join(root,'extension'),ext,{recursive:true});
 const context=await chromium.launchPersistentContext(path.join(temporary,profile),{executablePath:process.env.BRAVE_PATH||'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',headless:true,args:[`--disable-extensions-except=${ext}`,`--load-extension=${ext}`]});contexts.push(context);
 await context.route('https://**/*',r=>r.fulfill({contentType:'text/plain',body:''}));
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
 await worker.evaluate(()=>chrome.storage.local.set({stillSettings:{theme:'aurora',font:'inter',welcomeComplete:true,animations:false,weatherEnabled:false,newsEnabled:false,autoLocation:false,homeCard:'note',note:'Private device note',name:'Local name'}}));
 return {context,worker,id:new URL(worker.url()).host};
}
(async()=>{
 const a=await launch('desktop-extension','desktop-profile'),b=await launch('laptop-different-folder','laptop-profile');
 assert.equal(a.id,b.id);assert.equal(a.id,'lhllfnnfbpnoihkfocciliakpjpkplfg');console.log('PASS Native Brave loads the same fixed ID from two different absolute folders');
 await a.worker.evaluate(()=>SearchscapeSync.request({type:'browserSyncEnable',enabled:true}));
 const first=await a.worker.evaluate(async()=>(await chrome.storage.sync.get('grPreferencesV1')).grPreferencesV1);
 assert.equal(first.preferences.note,undefined);assert.equal(first.preferences.name,undefined);
 await b.worker.evaluate(async bundle=>{await chrome.storage.sync.set({grPreferencesV1:bundle});await SearchscapeSync.request({type:'browserSyncEnable',enabled:true});},first);
 const page=await b.context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(`chrome-extension://${b.id}/home.html?still=customize`);await page.locator('#settings').waitFor({state:'visible'});
 await page.waitForFunction(()=>!document.querySelector('#still-home').shadowRoot.querySelector('#browser-sync').disabled);
 assert.equal(await page.locator('#browser-sync').isChecked(),true);assert.match(await page.locator('#sync-id').innerText(),/Fixed across unpacked installation folders/);
 assert.match(await page.locator('#sync-now').locator('..').innerText(),/Brave Sync does not copy unpacked extension files/);
 console.log('PASS Homepage explains one-time opt-in, installation limits and the fixed ID');
 await a.worker.evaluate(async()=>{const settings=(await chrome.storage.local.get('stillSettings')).stillSettings;await chrome.storage.local.set({stillSettings:{...settings,theme:'solar',font:'outfit'}});});
 await new Promise(resolve=>setTimeout(resolve,900));
 const update=await a.worker.evaluate(async()=>(await chrome.storage.sync.get('grPreferencesV1')).grPreferencesV1);assert.equal(update.preferences.theme,'solar');
 await b.worker.evaluate(bundle=>chrome.storage.sync.set({grPreferencesV1:bundle}),update);
 await page.waitForFunction(()=>document.querySelector('#still-home').shadowRoot.querySelector('.app').dataset.theme==='solar');
 const saved=await b.worker.evaluate(async()=>(await chrome.storage.local.get('stillSettings')).stillSettings);
 assert.equal(saved.font,'outfit');assert.equal(saved.note,'Private device note');assert.equal(saved.name,'Local name');assert.deepEqual(errors,[]);
 console.log('PASS Simulated cross-device delivery updates the live homepage while preserving private local settings');
 console.log('3 native browser sync checks passed (delivery simulated).');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{for(const context of contexts)await context.close();});
