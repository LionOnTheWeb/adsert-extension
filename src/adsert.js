/* Helpers */
import {
  appendToParent,
  fetchAds,
  addStyles,
  emitAdsertEvent,
} from "./helpers.js";

/* Components */
import AdRenderer from "./components/adRenderer/adRenderer.js";
import Button from "./components/button/button.js";

/* Constants */
const ENDPOINT =
  "https://storage.cloud.kargo.com/ad/campaign/rm/test/interview-creatives.json";

const ads = await fetchAds(ENDPOINT);
const adsertEvents = {
  injected: "adsert:event:adsInjected",
  fetching: "adsert:event:adsFetching",
  fetched: "adsert:event:adsFetched",
  error: "adsert:event:error",
};

addStyles([chrome.runtime.getURL("./src/adsert.css")]);

const adsertButton = new Button(adsertEvents, () => {
  try {
    const adRenderer = new AdRenderer(ads);

    adRenderer.render();
    emitAdsertEvent(adsertEvents.injected, {
      text: "Ads injected!",
      state: "injected",
    });
  } catch (error) {
    console.error("[Adsert] Error rendering ads: ", error);
  }
});

const adsertButtonElement = adsertButton.render();

appendToParent(document.body, adsertButtonElement);
