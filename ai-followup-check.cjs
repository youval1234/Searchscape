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
  await settings({ theme: 'paper', appearance: 'dark', resultsTheme: true });
  const query = 'sample question & שלום';
  const search = new URL('https://www.google.com/search');
  search.searchParams.set('q', query);
  const nativeAI = new URL(search);
  nativeAI.searchParams.set('udm', '50');
  nativeAI.searchParams.set('mstk', 'synthetic-context_%2B/only');
  const fixture = `<!doctype html><html><body>
    <nav><a id="ai-tab">AI Mode</a></nav>
    <main id="search"><section data-attrid="SGEAnswer" style="max-height:100px;overflow:hidden">
      <h2>AI Overview</h2><p>A synthetic AI answer.</p>
      <div id="answer-actions"><button id="native-action">Native action</button></div>
    </section></main>
  </body></html>`;
  await context.route('https://www.google.com/**', route => route.fulfill({
    contentType: 'text/html',
    body: new URL(route.request().url()).searchParams.get('udm') === '50'
      ? '<!doctype html><main id="search"><textarea aria-label="Ask anything"></textarea><button>Send</button></main>'
      : fixture
  }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(search.href);
  await page.waitForFunction(() => document.documentElement.dataset.grTheme);
  assert.equal(await page.locator('#gr-results-ai').count(), 0);

  await page.locator('#ai-tab').evaluate((node, href) => node.href = href, nativeAI.href);
  const continuation = page.getByRole('link', { name: 'Continue in AI Mode →', exact: true });
  await continuation.waitFor();
  assert.equal(await continuation.getAttribute('href'), nativeAI.href);
  assert.equal(await continuation.evaluate(node => {
    const box = node.getBoundingClientRect();
    return node.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
  }), true);
  await expectNativeControls();
  console.log('PASS Missing follow-up entry gains a visible AI Mode link using Google’s complete URL');

  const thread = new URL(nativeAI);
  thread.searchParams.set('mstk', 'updated-context');
  await page.locator('#answer-actions').evaluate((node, href) => {
    const link = document.createElement('a');
    link.id = 'native-continuation';
    link.href = href;
    link.textContent = 'Dive deeper in AI Mode';
    node.append(link);
  }, thread.href);
  await page.waitForFunction(href => document.getElementById('gr-results-ai')?.href === href, thread.href);
  assert.equal(await page.locator('#gr-results-ai').count(), 1);
  console.log('PASS Streamed native continuation takes priority and preserves its conversation context');

  thread.searchParams.set('mstk', 'href-only-update');
  await page.locator('#native-continuation').evaluate((node, href) => node.href = href, thread.href);
  await page.waitForFunction(href => document.getElementById('gr-results-ai')?.href === href, thread.href);
  await settings({ theme: 'paper', appearance: 'light', resultsTheme: true });
  await page.waitForFunction(() => getComputedStyle(document.documentElement).colorScheme === 'light');
  await continuation.waitFor();
  await continuation.click();
  await page.waitForURL(thread.href);
  await page.getByRole('textbox', { name: 'Ask anything' }).fill('A follow-up question');
  assert.equal(await page.locator('#gr-results-ai').count(), 0);
  assert.equal(await page.getByRole('textbox', { name: 'Ask anything' }).inputValue(), 'A follow-up question');
  console.log('PASS Link navigation reaches AI Mode and leaves its native follow-up composer usable');

  await page.goto(search.href);
  await page.locator('#ai-tab').evaluate((node, href) => node.href = href, nativeAI.href);
  await continuation.waitFor();
  await settings({ resultsTheme: false });
  await page.waitForFunction(() => !document.getElementById('gr-results-ai'));
  await expectNativeControls();
  await settings({ resultsTheme: true });
  await continuation.waitFor();
  await page.locator('[data-attrid="SGEAnswer"]').evaluate(node => node.hidden = true);
  await page.locator('#ai-tab').evaluate(node => node.href += '&new-layout=1');
  await page.waitForFunction(() => document.getElementById('gr-results-ai')?.parentElement?.id === 'search');
  assert.equal(await continuation.isVisible(), true);
  await page.locator('#ai-tab').evaluate(node => node.href = 'https://www.google.com/search?q=unrelated&udm=50');
  await page.waitForFunction(() => !document.getElementById('gr-results-ai'));
  await page.locator('#ai-tab').evaluate(node => node.href = 'https://www.google.com.evil.test/search?q=sample&udm=50');
  assert.equal(await page.locator('#gr-results-ai').count(), 0);
  assert.deepEqual(errors, []);
  console.log('PASS Disabling results enhancements restores Google’s native controls');
  console.log('PASS Hidden answer layouts use the visible results area and unrelated or lookalike links are ignored');

  async function expectNativeControls() {
    assert.equal(await page.locator('#native-action').isVisible(), true);
    assert.equal(await page.locator('#native-action').evaluate(node => !!node.closest('[inert],[aria-hidden="true"]')), false);
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  if (context) await context.close();
  fs.rmSync(profile, { recursive: true });
});
