# Adsert - Ad Injecting Browser Extension

## Description
A coding challenge for KARGO-- Adsert is a browser extension that injects ads into the pages of specified websites.

## Features
- Fetches ads from a remote API.
- Calculates ad injection slots based on the article container and the number of ads.
- Renders and injects ads to dynamic slots in the article.
- Single init button ui with dynamic text for extension events.

## Folder Structure

```
ad-injector/
├─ manifest.json                  # extension manifest
├─ content.js                     # tiny loader (runs as classic script)
├─ src/
│  ├─ adsert.js                   # orchestrates everything
│  ├─ adsert.css                  # extension styles
│  ├─ helpers.js                  # helper functions for the extension
│  ├─ components/
│  │  ├─ button/
│  │  │  ├─ button.js             # build floating UI with dynamic text for extension events and event listeners
│  │  │  └─ button.css            # button styles
│  │  ├─ adRenderer/
│  │  │  ├─ adRenderer.js         # Renders the ads into the page
│  │  │  ├─ adframe.js            # Creates the Adsert adframe ui with dynamic size and nodes
│  │  │  └─ adsertAds.css         # Adsert ads styles

```

## How to Install the Extension

1. Clone the repository
2. Load the extension in Chrome by navigating to `chrome://extensions/` and enabling developer mode.
3. Click "Load unpacked" and select the repository root folder.
4. The extension should now be installed and can be used on the specified websites.



> [!WARNING]
> This extension uses the newly available `& nesting selector` css feature, which is only supported in devices and browsers updated since December 2023.
> If you are using an older device or browser, some styles may not be applied correctly.
> Read more about the `& nesting selector` css feature browser compatibility [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector#browser_compatibility).

## Notes

- The extension is designed to be used on the specified websites.
