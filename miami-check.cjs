const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const profile=fs.mkdtempSync(path.join(__dirname,'.test-profile-miami-'));
let context;
(async()=>{
  const extension=path.resolve(__dirname,'extension');
  context=await chromium.launchPersistentContext(profile,{
    executablePath:process.env.BRAVE_PATH||'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
    headless:true,viewport:{width:1440,height:1000},timezoneId:'UTC',
    args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]
  });
  const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
  await worker.evaluate(()=>chrome.storage.local.set({stillSettings:{
    welcomeComplete:true,theme:'paper',appearance:'dark',animations:true,name:'',
    weatherEnabled:false,newsEnabled:false,autoLocation:false,focus:false,clock:false,
    suggestions:false,photoNewsMigrated:true
  }}));
  await context.route('https://**/*',route=>route.abort());
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('chrome-extension://'+new URL(worker.url()).host+'/home.html?standalone=1');
  await page.getByRole('button',{name:'Customize',exact:true}).click();
  await page.locator('#theme-search').fill('GTA VI');
  assert.equal(await page.locator('[data-theme-choice]:visible').count(),1);
  await page.getByRole('button',{name:'GTA VI · Miami',exact:true}).click();
  await page.locator('.app[data-theme=miami]').waitFor();
  await page.getByRole('button',{name:'Close customization'}).click();
  await page.waitForFunction(async()=> (await chrome.storage.local.get('stillSettings')).stillSettings.theme==='miami');
  await page.reload();
  await page.locator('.theme-art svg[data-scene=miami]').waitFor();
  console.log('PASS Miami is selectable through theme search and survives reload');

  const prefs=patch=>worker.evaluate(async patch=>{
    const {stillSettings}=await chrome.storage.local.get('stillSettings');
    await chrome.storage.local.set({stillSettings:{...stillSettings,...patch}});
  },patch);
  async function checkBoulevard() {
    const image = await page.locator('svg[data-scene=miami]').evaluate(async svg => {
      const image = new Image();
      image.src = getComputedStyle(svg).backgroundImage.slice(5, -2);
      await image.decode();
      return [image.naturalWidth, image.naturalHeight, new URL(image.src).protocol];
    });
    assert.deepEqual(image, [1586, 992, 'chrome-extension:']);
  }
  await checkBoulevard();
  for(const appearance of ['dark','light']){
    await prefs({appearance});
    await page.locator(`.app[data-appearance=${appearance}]`).waitFor();
    await page.locator('.miami-rotor').first().evaluate(node=>getComputedStyle(node).animationName);
    const artwork=await page.locator('.theme-art').evaluate(node=>{
      const svg=node.querySelector('svg');
      return {
        nodes:svg.querySelectorAll('*').length,
        malformed:/NaN|undefined/.test(svg.innerHTML),
        active:node.getAnimations({subtree:true}).filter(animation=>animation.playState==='running').length,
        external:svg.querySelectorAll('image,script,foreignObject').length,
        ids:[...svg.querySelectorAll('[id]')].map(element=>element.id),
        features:['miami-marquee','miami-rotor','miami-traffic','miami-brakes','miami-ripple','miami-petal'].every(name=>svg.querySelector('.'+name))
      };
    });
    assert.ok(artwork.nodes<550,JSON.stringify(artwork));
    assert.equal(artwork.malformed,false);
    assert.equal(artwork.external,0);
    assert.equal(new Set(artwork.ids).size,artwork.ids.length);
    assert.equal(artwork.features,true);
    assert.ok(artwork.active>=12);
    if(process.env.GR_CAPTURE_PREVIEWS==='1'){
      fs.mkdirSync(path.join(__dirname,'docs/v241'),{recursive:true});
      await page.evaluate(()=>document.fonts.ready);
      await page.locator('.app').evaluate(async node=>{
        await Promise.all(node.getAnimations({subtree:true})
          .filter(animation=>animation.effect.getTiming().iterations!==Infinity)
          .map(animation=>animation.finished.catch(()=>{})));
        node.dataset.paused='true';
      });
      await page.screenshot({path:path.join(__dirname,`docs/v241/miami-${appearance}.png`)});
      await page.locator('.app').evaluate(node=>node.dataset.paused='false');
    }
    console.log(`PASS Miami ${appearance} has ${artwork.nodes} vector elements and ${artwork.active} active animations`);
  }
  await page.locator('.app').evaluate(node=>node.dataset.paused='true');
  assert.equal(await page.locator('.theme-art').evaluate(node=>node.getAnimations({subtree:true}).every(animation=>animation.playState==='paused')),true);
  await page.locator('.app').evaluate(node=>node.dataset.paused='false');
  await prefs({animations:false});
  await page.locator('.app[data-motion=off]').waitFor();
  assert.equal(await page.locator('.theme-art').evaluate(node=>node.getAnimations({subtree:true}).length),0);
  await prefs({animations:true,motionIntensity:'subtle'});
  await page.locator('.app[data-motion-intensity=subtle]').waitFor();
  assert.equal(await page.locator('.scene').evaluate(node=>getComputedStyle(node).opacity),'0.55');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.app[data-motion=off]').waitFor();
  assert.equal(await page.locator('.theme-art').evaluate(node=>node.getAnimations({subtree:true}).length),0);
  console.log('PASS Animations honor pause, off, Subtle intensity and reduced motion');

  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.locator('.app').evaluate(node=>node.scrollWidth<=node.clientWidth),true);
  if(process.env.GR_CAPTURE_PREVIEWS==='1') {
    await prefs({appearance:'dark',motionIntensity:'full'});
    await page.locator('.app[data-appearance=dark]').waitFor();
    await page.screenshot({path:path.join(__dirname,'docs/v241/miami-mobile.png')});
  }
  await page.getByRole('searchbox').fill('Miami coast');
  assert.equal(await page.getByRole('searchbox').inputValue(),'Miami coast');
  await page.getByRole('button',{name:'Customize',exact:true}).click();
  await page.getByRole('button',{name:'Paper',exact:true}).click();
  await page.locator('.theme-art svg[data-scene=paper]').waitFor();
  assert.equal(await page.locator('.miami-rotor').count(),0);
  await page.waitForFunction(async()=> (await chrome.storage.local.get('stillSettings')).stillSettings.theme==='paper');
  await page.getByRole('button',{name:'GTA VI · Miami',exact:true}).click();
  await page.getByRole('button',{name:'Close customization'}).click();
  await page.waitForFunction(async()=> (await chrome.storage.local.get('stillSettings')).stillSettings.theme==='miami');
  await page.locator('.theme-art svg[data-scene=miami]').waitFor();
  await context.route('https://www.google.com/',route=>route.fulfill({
    contentType:'text/html',body:'<!doctype html><html><head><title>Homepage fixture</title></head><body><form><input name="q"></form></body></html>'
  }));
  await page.goto('https://www.google.com/');
  await page.locator('.theme-art svg[data-scene=miami]').waitFor();
  assert.equal(await page.locator('.miami-marquee').count(),1);
  await checkBoulevard();
  assert.deepEqual(errors,[]);
  console.log('PASS Mobile controls fit, search remains usable, theme changes clean up and Google home loads the pack');
})().catch(error=>{
  console.error(error);
  process.exitCode=1;
}).finally(async()=>{
  if(context)await context.close();
  fs.rmSync(profile,{recursive:true});
});
