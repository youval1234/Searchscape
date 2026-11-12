# Searchscape v2.3.2

Settings sync now uses a fixed unpacked extension ID across computers and
installation folders. Incoming settings retain edits that are still waiting to
be sent, and newer identical updates prevent older settings from rolling back.

**Before upgrading from v2.3.1 or earlier, export your settings from the old
copy.** The fixed ID is a new extension identity. Install the new copy, disable
the old one, and import your export. Keep your old folder and export until you
have checked the result. [Step-by-step migration](docs/browser-sync.md)

On both desktop computers, join the same Brave Sync chain, enable its
**Extensions** category, and enable Searchscape's **Customize → Across your
devices → Use browser settings sync** once. Future allowed preference changes
are sent automatically. Notes, photos, name, location, and SearXNG addresses
remain local.

Each computer needs a one-time installation of the same fixed-ID build.
Preference changes then use your existing Brave Sync chain. “Saved to browser sync storage” confirms a browser write, not delivery
to another PC.
