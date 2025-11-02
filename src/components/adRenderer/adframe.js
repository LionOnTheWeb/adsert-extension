import {
  computeAdScale,
  createDOMelement,
  appendToParent,
  addStyles,
} from "../../helpers.js";

/**
 * @class AdFrame
 * @description Creates the Adsert adframe ui with dynamic size and nodes
 * @param {number} width - The width of the adframe
 * @param {number} height - The height of the adframe
 * @param {Node[]} nodes - The nodes to be appended to the adframe
 * @returns {Element} - The adframe element
 */
class AdFrame {
  constructor(width, height, nodes, type) {
    this.width = width;
    this.height = height;
    this.nodes = nodes;
    this.type = type;
    this.adframe = null;
    this.adframeWrapper = null;
  }

  /**
   * @description Renders the adframe and appends the nodes to the adframe
   * @param {Function} callback - The callback function to be called when the adframe is rendered
   * @returns {Element} - The adframe wrapper element
   */
  render(callback) {
    console.log("rendering adframe for type: ", this.type);
    this.adframeWrapper = createDOMelement(
      "div",
      `adframe__wrapper--${this.type}-ad`,
      ""
    );

    this.adframe = createDOMelement("div", `adframe--${this.type}-ad`, "", {
      width: `${this.width}px`,
      height: `${this.height}px`,
    });

    appendToParent(this.adframe, ...this.nodes);
    appendToParent(this.adframeWrapper, this.adframe);
    if (callback) callback(this.adframeWrapper);
    return this.adframeWrapper;
  }
}

export default AdFrame;
