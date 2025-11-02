import {
  findArticleContainer,
  getMiddleAdInsertionSlots,
  decodeMarkup,
  parseSize,
  createDOMelement,
  addStyles,
} from "../../helpers.js";

import AdFrame from "./adframe.js";

class AdRenderer {
  constructor(ads) {
    this.ads = ads;
  }

  _renderMiddleAds() {
    const middleAds = this.ads.filter(
      (ad) => (ad.type || "").toLowerCase() === "middle"
    );

    if (!middleAds.length) return;

    const container = findArticleContainer();
    const middleSlots = getMiddleAdInsertionSlots(container, middleAds.length);
    let middleAdIndex = 0;

    for (const ad of middleAds) {
      if (!ad.type || ad.type.toLowerCase() !== "middle") return;

      const nodes = decodeMarkup(ad.markup);
      const { w, h } = parseSize(ad.size);
      const middleAdEl = new AdFrame(w, h, nodes, ad.type);

      middleSlots[middleAdIndex++].appendChild(middleAdEl.render());
    }
  }

  _renderStickyAd() {
    const stickyAd = this.ads.find(
      (ad) => (ad.type || "").toLowerCase() === "sticky"
    );

    if (!stickyAd) return;

    const nodes = decodeMarkup(stickyAd.markup);
    const { w, h } = parseSize(stickyAd.size);
    const stickyAdEl = new AdFrame(w, h, nodes, stickyAd.type);
    const stickyCloseButton = createDOMelement("button", "sticky__close", "×");

    stickyCloseButton.setAttribute("aria-label", "[Adsert] Close sticky ad");
    stickyCloseButton.textContent = "×";
    stickyCloseButton.addEventListener("click", () => stickyAdEl.remove());

    stickyAdEl.render().appendChild(stickyCloseButton);
    document.body.appendChild(stickyAdEl.render());
  }

  render() {
    this._renderMiddleAds();
    this._renderStickyAd();
  }
}

export default AdRenderer;
