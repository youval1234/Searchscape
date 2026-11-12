# Searchscape v2.3.5

The native AI follow-up prompt now skips its entrance fade and slide delay when Searchscape results theming is enabled. Its placeholder and entering composer controls receive the same immediate timing.

The change uses the native composer selectors and animation rules inspected on the live Google results page. Regression checks in Brave verify the first animation frame, typing, provider hidden/disabled states, and restoring native timing when results theming is switched off. Google controls when it delivers the native field.

To update from v2.3.2 or later, replace the files in the existing unpacked extension folder, reload Searchscape at brave://extensions, and refresh the Google results tab.

If upgrading from v2.3.1 or earlier, export your settings before installing. See SYNC_UPGRADE.md in the ZIP or the repository's browser-sync guide.
