/* Helpers */
import { appendToParent, fetchAds, addStyles } from "./helpers.js";

/* Components */
import AdRenderer from "./components/adRenderer/adRenderer.js";
import Button from "./components/button/button.js";

/* Constants */
const ENDPOINT =
  "https://storage.cloud.kargo.com/ad/campaign/rm/test/interview-creatives.json";

const ads = await fetchAds(ENDPOINT);

addStyles([chrome.runtime.getURL("./src/adsert.css")]);

const adsertButton = new Button(() => {
  console.log("[Adsert] Button clicked");
  try {
    const adRenderer = new AdRenderer(ads);
    adRenderer.render();
  } catch (error) {
    console.error("[Adsert] Error rendering ads: ", error);
  }
});

const adsertButtonElement = adsertButton.render();

appendToParent(document.body, adsertButtonElement);
