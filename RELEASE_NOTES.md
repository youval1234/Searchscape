# Searchscape v2.3.3

- Google search results now show a clear **Continue in AI Mode** link when Google provides an AI Mode destination.
- The link uses Google’s complete native URL and prefers an answer-specific continuation when available. Google controls AI Mode availability and conversation context.
- Regression checks cover streamed answers, destination updates, native composer input, hidden layouts, theme changes and disabling results enhancements.

The live provider check encountered Google’s verification challenge. It was left untouched. The continuation flow passed controlled Brave tests.

If upgrading from v2.3.2, replace the files in the existing unpacked extension folder, reload Searchscape at `brave://extensions`, and refresh the Google results tab.

**If upgrading from v2.3.1 or earlier, export your settings before installing.** This release includes v2.3.2's fixed extension identity for cross-computer Brave Sync. Install the new copy, disable the old one, and import the export. Keep your old folder and export until you have checked the result. See `SYNC_UPGRADE.md` in the ZIP or [the migration guide](https://github.com/youval1234/Searchscape/blob/main/docs/browser-sync.md).
