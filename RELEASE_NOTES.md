# Searchscape v2.3.4

- Remove the duplicate **Continue in AI Mode** button added by Searchscape. It could appear at the left edge or stretch into a large empty block beside an answer.
- Correct the answer fade so its colors blend into the selected page background in light and dark mode, including streamed inline gradients.
- Preserve Google's native AI Mode tab, answer expansion, conversation links and follow-up input.

Controlled Brave tests passed for the answer layout, fade colors, native AI navigation, composer input, contrast and restoring native styles. A live Google check reached a verification challenge, so verification against the account-specific live layout remains limited.

To update from v2.3.2 or v2.3.3, replace the files in the existing unpacked extension folder, reload Searchscape at brave://extensions, and refresh the Google results tab.

If upgrading from v2.3.1 or earlier, export your settings before installing. This release retains the fixed extension identity for cross-computer sync. See SYNC_UPGRADE.md in the ZIP or the repository's browser-sync guide.
