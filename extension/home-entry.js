// Leave the browser-managed New Tab wrapper unless the clean address bar is enabled.
(async () => {
  const params = new URLSearchParams(location.search);
  const marker = 'searchscape-standalone';
  if (params.get('standalone') === '1') {
    try { sessionStorage.setItem(marker, '1'); } catch {}
    return;
  }
  try {
    if (sessionStorage.getItem(marker) === '1' && window.top === window) return;
  } catch {}

  const settings = await SearchscapeBoot.ready;
  if (settings.cleanAddressBar === true && !chrome.extension.inIncognitoContext &&
      !params.has('still') && !params.has('section')) return;

  // getCurrent/update target only our own tab and require no tab-reading permission.
  const tab = await chrome.tabs.getCurrent();
  if (!tab?.id) return;
  const target = new URL(chrome.runtime.getURL('home.html'));
  target.searchParams.set('standalone', '1');
  if (params.get('still') === 'customize') target.searchParams.set('still', 'customize');
  if (params.get('section') === 'private') target.searchParams.set('section', 'private');
  await chrome.tabs.update(tab.id, {url: target.href});
})().catch(() => {});
