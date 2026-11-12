const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const profile = fs.mkdtempSync(path.join(__dirname, '.test-profile-ai-followup-'));
let context;

(async () => {
  const extension = path.resolve(__dirname, 'extension');
  context = await chromium.launchPersistentContext(profile, {
    executablePath: process.env.BRAVE_PATH || 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
    headless: true,
    viewport: { width: 1200, height: 800 },
    args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`]
  });
  const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
  const settings = value => worker.evaluate(value => chrome.storage.local.set({ stillSettings: value }), value);
  await settings({ theme: 'sage', appearance: 'dark', resultsTheme: true });
  const search = new URL('https://www.google.com/search');
  search.searchParams.set('q', 'sample question & test');
  const nativeAI = new URL(search);
  nativeAI.searchParams.set('udm', '50');
  nativeAI.searchParams.set('mstk', 'synthetic-context_%2B/only');
  const fixture = `<!doctype html><html><head><style>
    body{background:#202124;color:#e8eaed}
    #search{display:grid;grid-template-columns:240px minmax(0,1fr);align-items:stretch}
    .answer{grid-column:2;position:relative;min-width:0}
    .answer-copy{max-height:140px;overflow:hidden;position:relative}
    .fade{position:absolute;inset:auto 0 0;height:80px;pointer-events:none;
      background:linear-gradient(0deg,#303134 20%,rgba(48,49,52,0) 100%)}
  </style></head><body>
    <nav><a id="ai-tab">AI Mode</a></nav>
    <main id="search"><section class="answer" data-attrid="SGEAnswer">
      <div class="answer-copy"><h2>AI Overview</h2>
        <p>A synthetic AI answer.</p><p>More answer text.</p><p>The rest of the answer.</p>
        <div class="fade"></div>
      </div>
      <button id="show-more">Show more</button>
      <div id="answer-actions"><a id="native-continuation">Dive deeper in AI Mode</a></div>
    </section></main>
  </body></html>`;
  await context.route('https://www.google.com/**', route => route.fulfill({
    contentType: 'text/html',
    body: new URL(route.request().url()).searchParams.get('udm') === '50'
      ? '<!doctype html><html><body><main id="search"><p id="ai-answer">An AI answer.</p><textarea aria-label="Ask anything"></textarea><button>Send</button></main></body></html>'
      : fixture
  }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(search.href);
  await page.locator('#ai-tab').evaluate((node, href) => node.href = href, nativeAI.href);
  await page.locator('#native-continuation').evaluate((node, href) => node.href = href, nativeAI.href);
  await page.waitForFunction(() => document.documentElement.dataset.grTheme);
  await page.locator('#gr-results-home').waitFor();
  assert.equal(await page.locator('#gr-results-ai').count(), 0);
  assert.equal(await page.locator('#search > *').count(), 1);
  assert.equal(await page.locator('#native-continuation').getAttribute('href'), nativeAI.href);
  assert.equal(await page.getByRole('button', { name: 'Show more', exact: true }).isVisible(), true);
  console.log('PASS Results keep native AI links and the answer grid without a duplicate continuation block');

  for (const appearance of ['dark', 'light']) {
    await settings({ theme: 'sage', appearance, resultsTheme: true });
    await page.waitForFunction(mode => getComputedStyle(document.documentElement).colorScheme === mode, appearance);
    await page.waitForFunction(() => {
      const color = getComputedStyle(document.body).backgroundColor;
      return getComputedStyle(document.querySelector('.fade')).backgroundImage.includes(color);
    });
    assert.equal(await page.locator('.fade').evaluate(node => {
      const box = node.getBoundingClientRect();
      const answer = document.querySelector('.answer').getBoundingClientRect();
      return box.left >= answer.left && box.right <= answer.right;
    }), true);
  }
  await page.locator('#show-more').evaluate(node => {
    node.onclick = () => {
      document.querySelector('.answer-copy').style.maxHeight = 'none';
      document.querySelector('.fade').hidden = true;
    };
  });
  await page.getByRole('button', { name: 'Show more', exact: true }).click();
  assert.equal(await page.locator('.fade').isVisible(), false);
  console.log('PASS Collapsed-answer gradients blend into the page in both appearances and expansion stays usable');

  await page.getByRole('link', { name: 'Dive deeper in AI Mode', exact: true }).click();
  await page.waitForURL(nativeAI.href);
  await page.locator('#gr-results-home').waitFor();
  await page.getByRole('textbox', { name: 'Ask anything' }).fill('A follow-up question');
  assert.equal(await page.locator('#ai-answer').isVisible(), true);
  assert.equal(await page.locator('#gr-results-ai').count(), 0);
  assert.equal(await page.getByRole('textbox', { name: 'Ask anything' }).inputValue(), 'A follow-up question');
  assert.equal(new URL(page.url()).searchParams.get('mstk'), nativeAI.searchParams.get('mstk'));
  console.log('PASS Native navigation preserves AI context, themed answer text and the follow-up composer');

  const entrance = await page.evaluate(async () => {
    const css = document.createElement('style');
    css.textContent = `
      @keyframes srp-to-aim-fade-in{from{opacity:0}to{opacity:1}}
      @keyframes page-enter-ease-in{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
      @keyframes expanded-page-enter-input-plate{from{opacity:0}to{opacity:1}}
      @keyframes show-on-expand{0%,17%{opacity:0}100%{opacity:1}}
      .y4VEUd.QtNC8b{animation:srp-to-aim-fade-in .3s .1s both}
      .awLKaf .AgWCw{animation:page-enter-ease-in .3s .2s both}
      .f8NOwb .AgWCw{animation:expanded-page-enter-input-plate .9s both}
      .f8NOwb.UAbVe .Txyg0d,.UAbVe .NKu3uf{animation:show-on-expand .9s both}
      .Rc0vkf .ITIRGe::placeholder{animation:show-on-expand .6s both}
      #native-hidden-composer{display:none}
    `;
    document.head.append(css);
    const host = document.createElement('div');
    host.id = 'composer-entrance-fixture';
    host.innerHTML = `<div class="y4VEUd QtNC8b"><div class="f8NOwb UAbVe Rc0vkf">
      <div class="AgWCw"><div class="Txyg0d"><textarea class="ITIRGe" aria-label="Immediate follow-up" placeholder="Ask anything"></textarea></div>
      <button class="NKu3uf" disabled>Unavailable action</button></div>
    </div></div><div class="awLKaf"><div class="AgWCw">Native entry</div></div>
    <div id="native-hidden-composer">Hidden provider state</div>`;
    document.body.append(host);
    await new Promise(requestAnimationFrame);
    const states = [...host.querySelectorAll('.QtNC8b,.AgWCw,.Txyg0d,.NKu3uf')].map(node => {
      const style = getComputedStyle(node);
      return {duration:style.animationDuration,delay:style.animationDelay,opacity:style.opacity};
    });
    const placeholder = getComputedStyle(host.querySelector('textarea'),'::placeholder');
    return {states,placeholderDuration:placeholder.animationDuration,disabled:host.querySelector('button').disabled,hidden:getComputedStyle(host.querySelector('#native-hidden-composer')).display};
  });
  for (const state of entrance.states) {
    assert.equal(state.duration,'0s');
    assert.equal(state.delay,'0s');
    assert.equal(state.opacity,'1');
  }
  assert.equal(entrance.placeholderDuration,'0s');
  assert.equal(entrance.disabled,true);
  assert.equal(entrance.hidden,'none');
  await page.getByRole('textbox',{name:'Immediate follow-up',exact:true}).fill('Typed immediately');
  assert.equal(await page.getByRole('textbox',{name:'Immediate follow-up',exact:true}).inputValue(),'Typed immediately');
  console.log('PASS Native prompt and placeholder entrance animations finish on the first frame while input and provider states remain intact');

  await settings({resultsTheme:false});
  await page.waitForFunction(()=>!document.documentElement.dataset.grTheme);
  assert.equal(await page.locator('#composer-entrance-fixture .QtNC8b').evaluate(node=>getComputedStyle(node).animationDuration),'0.3s');
  assert.equal(await page.locator('#composer-entrance-fixture textarea').evaluate(node=>getComputedStyle(node,'::placeholder').animationDuration),'0.6s');
  await settings({theme:'sage',appearance:'light',resultsTheme:true});
  await page.waitForFunction(()=>getComputedStyle(document.documentElement).colorScheme==='light');
  assert.equal(await page.locator('#composer-entrance-fixture .QtNC8b').evaluate(node=>getComputedStyle(node).animationDuration),'0s');
  console.log('PASS Composer timing follows the results setting and re-enabling it restores immediate appearance');

  await page.goto(search.href);
  await page.locator('#gr-results-home').waitFor();
  await page.locator('.answer-copy').evaluate(node => {
    const fade = document.createElement('div');
    fade.id = 'streamed-fade';
    fade.style.background = 'linear-gradient(to top, rgb(48, 49, 52), rgba(48, 49, 52, 0))';
    node.append(fade);
  });
  await page.waitForFunction(() => getComputedStyle(document.getElementById('streamed-fade')).backgroundImage.includes(getComputedStyle(document.body).backgroundColor));
  await settings({ resultsTheme: false });
  await page.waitForFunction(() => !document.documentElement.dataset.grTheme);
  assert.equal(await page.locator('.fade').evaluate(node => getComputedStyle(node).backgroundImage.includes('rgb(48, 49, 52)')), true);
  assert.equal(await page.locator('#streamed-fade').evaluate(node => node.style.backgroundImage.includes('rgb(48, 49, 52)')), true);
  assert.deepEqual(errors, []);
  console.log('PASS Streamed inline fades receive the same repair and disabling theming restores native gradients');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  if (context) await context.close();
  fs.rmSync(profile, { recursive: true });
});
