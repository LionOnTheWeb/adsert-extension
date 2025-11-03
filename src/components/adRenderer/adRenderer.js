import {
  findArticleContainer,
  getMiddleAdInsertionSlots,
  decodeMarkup,
  parseSize,
  createDOMelement,
  appendToParent,
  emitAdsertEvent,
} from "../../helpers.js";

import AdFrame from "./adframe.js";

/**
 * @class AdRenderer
 * @description Renders the ads into the page
 * @param {Object} events - Adsert events for emitting events
 * @param {Array} ads - Ads response from the API
 */
class AdRenderer {
  constructor(events, ads) {
    this.ads = ads;
    this.events = events;
  }

  /**
   * @private
   * @description Renders the middle ads
   * @returns {void}
   */
  async _renderMiddleAds() {
    const middleAds = this.ads.filter(
      (ad) => (ad.type || "").toLowerCase() === "middle"
    );

    if (!middleAds.length) return;

    try {
      const container = findArticleContainer();
      const middleSlots = getMiddleAdInsertionSlots(
        container,
        middleAds.length
      );
      let middleAdIndex = 0;

      for (const ad of middleAds) {
        if (!ad.type || ad.type.toLowerCase() !== "middle") return;

        const nodes = decodeMarkup(ad.markup);
        const { w, h } = parseSize(ad.size);
        const middleAdEl = new AdFrame(w, h, nodes, ad.type);

        middleSlots[middleAdIndex++].appendChild(middleAdEl.render());
      }
    } catch (error) {
      console.error("[Adsert] Error rendering middle ads: ", error);
      emitAdsertEvent(this.events.error, {
        text: "Error rendering middle ads 🚨",
        state: "error",
        source: this,
      });
      return;
    }
  }

  /**
   * @private
   * @description Waits for the element to be rendered in the DOM
   * @param {Element} element - The element to wait for
   * @returns {Promise<void>}
   */
  async _waitForElementToRender(element) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  /**
   * @private
   * @description Renders the sticky ad
   * @returns {void}
   */
  async _renderStickyAd() {
    const stickyAd = this.ads.find(
      (ad) => (ad.type || "").toLowerCase() === "sticky"
    );

    if (!stickyAd) return;

    try {
      const nodes = decodeMarkup(stickyAd.markup);
      const { w, h } = parseSize(stickyAd.size);
      const stickyAdEl = new AdFrame(w, h, nodes, stickyAd.type);

      // Render the sticky ad element
      const stickyAdElement = stickyAdEl.render();

      // Append to DOM first
      document.body.appendChild(stickyAdElement);

      // Wait for the ad to be fully rendered (including images)
      await this._waitForElementToRender(stickyAdElement);

      // Now create and append the close button after the ad is fully rendered
      const stickyCloseButton = createDOMelement(
        "button",
        "adframe--sticky-ad__close",
        "×"
      );
      stickyCloseButton.setAttribute("aria-label", "[Adsert] Close sticky ad");
      stickyCloseButton.title = "[Adsert] Close sticky ad";
      stickyCloseButton.textContent = "×";
      stickyCloseButton.addEventListener("click", () =>
        stickyAdElement.remove()
      );
      stickyAdElement.appendChild(stickyCloseButton);
    } catch (error) {
      console.error("[Adsert] Error rendering sticky ad: ", error);
      emitAdsertEvent(this.events.error, {
        text: "Error rendering sticky ad 🚨",
        state: "error",
        source: this,
      });
      return;
    }
  }

  /**
   * @description Injects the ads into the page
   * @returns {void}
   */
  async render() {
    try {
      await this._renderMiddleAds();
      await this._renderStickyAd();
      emitAdsertEvent(this.events.injected, {
        text: "Ads injected 🎉",
        state: "injected",
      });
    } catch (error) {
      console.error("[Adsert] Error rendering ads: ", error);
      emitAdsertEvent(this.events.error, {
        text: "Error rendering ads 🚨",
        state: "error",
        source: this,
      });
      return;
    }
  }
}

export default AdRenderer;
