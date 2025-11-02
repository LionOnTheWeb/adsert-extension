(async () => {
  try {
    const url = chrome.runtime.getURL("src/adsert.js");
    await import(url);
  } catch (e) {
    console.error("[Adsert] failed to initialize: ", e.message);
    alert("[Adsert] failed to initialize. See console for details.");
  }
})();
