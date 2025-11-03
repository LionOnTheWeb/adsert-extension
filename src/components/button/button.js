import { createDOMelement } from "../../helpers.js";

/**
 * @class Button
 * @description Creates the Adsert button ui with dynamic text for action states
 * @param {Function} callback - The callback function to be called when the button is clicked
 * @returns {Element} - The button element
 */
class Button {
  constructor(events, callback) {
    this.buttonDefaultText = "Inject Ads";

    this.buttonEl = createDOMelement(
      "button",
      "button",
      this.buttonDefaultText
    );
    this.buttonEl.addEventListener("click", callback);
    this.buttonEl.title = "[Adsert] Fetch & inject ads";
    this.buttonEl.text = this.buttonDefaultText;

    this.buttonWrapper = createDOMelement("div", "button__wrapper", "");
    this.buttonWrapper.appendChild(this.buttonEl);

    this.events = events;
  }

  render() {
    Object.values(this.events).forEach((event) => {
      document.addEventListener(event, (event) =>
        this.updateButtonText(event.detail.text)
      );
    });
    return this.buttonWrapper;
  }

  /**
   * Updates the button text with event detail text
   * @param {string} text - The text to update the button to
   * @returns {void}
   */
  updateButtonText(text) {
    this.buttonEl.innerText = text;
  }

  /**
   * @description Destroys the button after timeout
   * @param {number} timeout - The timeout in milliseconds
   * @returns {void}
   */
  destroy(timeout = 5000) {
    this.buttonEl.disabled = true;
    this.buttonEl.removeEventListener("click", this.callback);
    Object.values(this.events).forEach((event) =>
      document.removeEventListener(event, (event) =>
        this.updateButtonText(event.detail.text)
      )
    );

    setTimeout(() => {
      this.buttonWrapper.remove();
    }, timeout);
  }
}

export default Button;
