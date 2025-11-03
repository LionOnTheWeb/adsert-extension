import { appendToParent, fetchAds, addStyles } from "./helpers.js";

import AdRenderer from "./components/adRenderer/adRenderer.js";
import Button from "./components/button/button.js";

const ENDPOINT =
    "https://storage.cloud.kargo.com/ad/campaign/rm/test/interview-creatives.json",
  ads = await fetchAds(ENDPOINT),
  adsertEvents = {
    injected: "adsert:event:adsInjected",
    fetching: "adsert:event:adsFetching",
    fetched: "adsert:event:adsFetched",
    error: "adsert:event:error",
  };

addStyles([chrome.runtime.getURL("./src/adsert.css")]);

const adsertButton = new Button(adsertEvents, () => {
  const adRenderer = new AdRenderer(adsertEvents, ads);

  adRenderer.render();
  adsertButton.destroy(5000);
});

const adsertButtonElement = adsertButton.render();

appendToParent(document.body, adsertButtonElement);
