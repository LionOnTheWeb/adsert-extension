/* ----------------------------- Ad Response Helpers ----------------------------- */

/**
 * Decodes base64 markup into an array of DOM nodes
 * @param {string} b64 - The base64 encoded markup
 * @returns {Node[]} - An array of DOM nodes
 */
function decodeMarkup(b64) {
  try {
    const html = atob(b64 || "");
    const markupContainer = document.createElement("div");

    markupContainer.innerHTML = html;

    return Array.from(markupContainer.childNodes);
  } catch {
    throw new Error("Invalid markup, could not decode");
  }
}

/**
 * Parses a size string into an object with width and height
 * @param {string} size - The size string in the format "widthxheight"
 * @returns {Object} - An object with width and height
 */
function parseSize(size) {
  const [w, h] = size.split("x");
  return { w: parseInt(w), h: parseInt(h) };
}

/* ----------------------------- Ad Injection Helpers ----------------------------- */

/**
 * Fetches ads from the endpoint
 * @param {string} endpoint - The endpoint to fetch ads from
 * @returns {Object[]} - An array of ads
 */
async function fetchAds(endpoint) {
  const response = await fetch(endpoint, {
    cache: "no-store",
    credentials: "omit",
  });
  if (!response.ok)
    throw new Error(
      `[Adsert] API error: ${response.status} ${response.statusText}`
    );

  const { ads } = await response.json();

  if (!ads || !Array.isArray(ads))
    throw new Error("[Adsert] Invalid API response");

  return ads;
}

/**
 * Finds the article container in the document
 * @returns {Element} - The article container
 */
function findArticleContainer() {
  const selectors =
    "article, main, [role='main'], .entry-content, .post-content, .post__content, .content";
  const candidates = Array.from(document.querySelectorAll(selectors));
  if (!candidates.length) return document.body;

  const scored = candidates
    .map((el) => ({ el, p: el.querySelectorAll("p, div, section").length }))
    .sort((a, b) => b.p - a.p);

  return scored[0]?.el || document.body;
}

/**
 * Finds the middle ad insertion slots for the article container
 * @param {Element} articleContainer - The article container
 * @param {number} adCount - The number of middle ad insertion slots to find
 * @returns {Element[]} - An array of middle ad insertion slots
 */
function getMiddleAdInsertionSlots(articleContainer, adCount) {
  const blocks = Array.from(
    articleContainer.querySelectorAll("p, h2, h3, h4, ul, ol, figure, div")
  ).filter((block) => block.offsetParent !== null);

  if (!blocks.length || adCount <= 0)
    return Array(adCount).fill(articleContainer);

  const slots = [];

  // Evenly distribute the ad insertion slots
  for (let i = 1; i <= adCount; i++) {
    const idx = Math.min(
      blocks.length - 1,
      Math.max(0, Math.floor((i / (adCount + 1)) * blocks.length))
    );
    slots.push(blocks[idx]);
  }
  return slots;
}

/* ----------------------------- Document Helpers ----------------------------- */

/**
 * Adds styles to the document
 * Note: URLs retrieved from the Chrome runtime are already prefixed with chrome-extension://
 * Use Example: chrome.runtime.getURL("styles/core.css") to get the URL for the core stylesheet
 * @param {string[]} hrefs - The hrefs of the styles to add
 * @returns {void}
 */
function addStyles(hrefs) {
  for (const href of hrefs) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.id = `adsert-style-${href.split("/").pop().replace(".css", "")}`;
    document.head.appendChild(link);
  }
}

/**
 * Creates a DOM element
 * @param {string} tag - The tag name of the element
 * @param {string} className - The class name of the element
 * @param {string} html - The HTML content of the element
 * @param {Object} style - The style object of the element
 * @returns {Element} - The created element
 */
function createDOMelement(tag, className, html, style) {
  const element = document.createElement(tag);

  if (className) element.className = `adsert__${className}`;
  if (html != null) element.innerHTML = html;
  if (style) Object.assign(element.style, style);

  return element;
}

/**
 * Appends children to a parent element
 * @param {Element} parent - The parent element
 * @param {Element[]} children - The children to append
 * @returns {Element} - The parent element
 */
function appendToParent(parent, ...children) {
  children.forEach((child) => parent.appendChild(child));
  return parent;
}

/**
 * Computes the scale for an ad based on the target width and margin
 * @param {number} targetWidth - The target width of the ad
 * @param {number} margin - The margin around the ad
 * @returns {number} - The scale for the ad
 */
function computeAdScale(targetWidth, margin = 24) {
  const maxW = Math.max(200, (window.innerWidth || 360) - margin * 2);
  return Math.min(1, maxW / targetWidth);
}

export {
  decodeMarkup,
  parseSize,
  findArticleContainer,
  getMiddleAdInsertionSlots,
  addStyles,
  createDOMelement,
  appendToParent,
  computeAdScale,
  fetchAds,
};
