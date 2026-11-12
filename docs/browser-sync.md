# Browser sync: setup, upgrade, and limitations

Searchscape uses `chrome.storage.sync` for appearance, shortcuts, and widget
preferences. After you enable it once on each computer, changes are sent
automatically. It does not operate a separate sync server or read your Brave
Sync code.

## Why the old setup did not work

- Releases through v2.3.1 were installed with **Load unpacked** and did not have a
  manifest public key. Chromium derives an unpacked extension's ID from its
  folder when no key exists. Different paths on different computers therefore
  use different sync namespaces, even in the same Brave Sync chain.
- Brave Sync cannot install or update an unpacked folder on another computer.
  It syncs supported extension installations, not the files in a GitHub ZIP.
- Searchscape sync is opt-in on each device. Joining a Brave chain alone does
  not enable the Searchscape switch.
- A successful `storage.sync.set` only confirms a browser storage write. It
  succeeds even while browser sync is disabled; it cannot confirm delivery.
- The old receiver could replace local edits still waiting to be sent, and did
  not advance its timestamp when a newer update contained identical settings.

## Upgrade from v2.3.1 or earlier without losing settings

The fixed public key in v2.3.2 gives unpacked copies this ID on every computer:

`lhllfnnfbpnoihkfocciliakpjpkplfg`

Adding the key changes the identity of existing folder-based installations.
Brave keeps each identity's settings separate. **Export before replacing any
files or removing the old extension.**

1. On the computer with the settings you want to keep, open the old Searchscape
   homepage → **Customize → Keep it yours → Export settings**. Keep the export
   private: it can include your name, notes, shortcuts, location, and photo.
2. Install the v2.3.2 ZIP in a permanent folder through `brave://extensions` →
   **Developer mode → Load unpacked**. Disable the old copy so only one
   Searchscape controls new tabs. Keep the old folder and export until checked.
3. In the new copy, **Customize → Keep it yours → Import settings**. Confirm
   that your theme, shortcuts, and any local note/photo are present.
4. Join the same Brave Sync chain on both desktop computers and enable
   **Extensions** in Brave's Sync settings on both. Let Brave finish its initial
   connection. No Brave or Google account login is needed for Brave Sync.
5. On the first computer, enable **Customize → Across your devices → Use browser
   settings sync**. This sends your allowed preferences to browser sync storage.
6. Install v2.3.2 on the other computer, compare the ID above, and turn on the
   same Searchscape switch there. Existing synced preferences are used on first
   enable. Future edits on either computer are sent automatically.
7. Change the theme on one computer and confirm it appears on the other. A
   “Saved to browser sync storage” message alone is not proof of delivery.

Future unpacked updates can replace files in the same folder and use Reload.
Keep the manifest key unchanged. Disabling Searchscape sync stops sending and
receiving; it does not delete the existing browser sync copy.

## Use on your two computers

Load the same fixed-ID build once on each computer and enable preference sync
on both. Preferences then use your existing Brave Sync chain.

Brave Sync does not copy unpacked extension files between computers, so each
computer needs that one-time installation. Keep the fixed manifest key unchanged
on both computers.

## Troubleshooting and scope

- **No extension appeared:** load the same fixed-ID build on that computer once.
  Searchscape cannot install itself on another PC.
- **Different IDs:** install the same fixed-ID release. Old settings must be
  exported from their old identity and imported into the new one.
- **Off:** turn on the Searchscape switch on each computer as well as Brave's
  Extensions sync category. The switch stays opt-in for privacy.
- **Saved but nothing arrived:** compare IDs, check that both browsers are on
  the same chain with Extensions enabled, check `brave://sync-internals` for
  **Extension settings** and sync errors, then use **Check browser sync**.
  Extensions cannot inspect or enable the browser's sync service themselves.
- **8 KB error:** the current format uses one item, within the browser's 8 KB
  per-item limit. Shorten large shortcut URLs or use Export / Import. Local
  settings are retained when a write fails.
- **Update requested:** a newer sync schema was found. Update Searchscape;
  this device leaves that payload intact.

Names, notes, uploaded photo bytes, city/coordinates, hardware samples, the
SearXNG instance address, and permission-dependent private-tab setup stay local.
The settings whitelist is unchanged. Settings sync and extension installation
are separate browser features.

## Sources and validation

- [Chromium extension sync eligibility](https://source.chromium.org/chromium/chromium/src/+/main:chrome/common/extensions/sync_helper.cc)
  excludes unpacked installation locations.
- [Manifest key documentation](https://developer.chrome.com/docs/extensions/reference/manifest/key)
  explains stable unpacked extension IDs.
- [Extension storage documentation](https://developer.chrome.com/docs/extensions/reference/api/storage)
  describes storage namespaces, offline behavior, and quotas.
- [Brave Sync setup](https://support.brave.app/hc/en-us/articles/360021218111-How-do-I-set-up-Sync)
  describes joining a chain and selecting data categories.

`node sync-check.cjs` covers separate device state, delayed deliveries, pending
edits, failed writes, worker restarts, opt-out, and newer schema protection.
Browser tests use disposable profiles; simulated storage delivery is not a
claim of successful delivery through a user's live Brave Sync chain.
