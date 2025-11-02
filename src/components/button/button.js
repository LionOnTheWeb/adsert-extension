import { createDOMelement, appendToParent, addStyles } from "../../helpers.js";

/**
 * @class Button
 * @description Creates the Adsert button ui with dynamic text for action states
 * @param {Function} callback - The callback function to be called when the button is clicked
 * @returns {Element} - The button element
 */
class Button {
  constructor(callback) {
    this.buttonDefaultText = "Inject Ads";
    this.buttonEl = createDOMelement(
      "button",
      "button",
      this.buttonDefaultText
    );
    this.buttonEl.addEventListener("click", callback);
    this.buttonEl.title = "Fetch & inject ads";
    this.buttonEl.text = this.buttonDefaultText;
    this.buttonWrapper = createDOMelement("div", "button__wrapper", "");
    this.buttonWrapper.appendChild(this.buttonEl);
    this.render();
  }

  render() {
    return this.buttonWrapper;
  }

  updateState(state) {
    switch (state) {
      case "fetch":
        this.buttonEl.text = "Fetching ads...";
        break;
      case "success":
        this.buttonEl.text = "Ads injected!";
        break;
      case "error":
        this.buttonEl.text = "Error injecting ads";
        break;
      default:
        this.buttonEl.text = this.buttonDefaultText;
        break;
    }
  }

  reset() {
    this.buttonEl.text = this.buttonDefaultText;
    this.buttonEl.disabled = false;
    this.buttonEl.title = "Fetch & inject ads";
  }
}

export default Button;
