import { createDOMelement } from "../../helpers.js";

/**
 * @class Button
 * @description Creates the Adsert button ui with dynamic text for action states
 * @param {Function} callback - The callback function to be called when the button is clicked
 * @returns {Element} - The button element
 */
class Button {
  constructor(events, callback) {
    this.events = events;
    this.callback = callback;
  }

  render() {
    const buttonWrapperEl = this.buildButton();
    Object.values(this.events).forEach((event) => {
      document.addEventListener(event, (event) =>
        this.updateButtonText(event.detail.text)
      );
    });

    return buttonWrapperEl;
  }

  /**
   * @description Builds the button element
   * @returns {Element} - The button wrapper element
   */
  buildButton() {
    const buttonDefaultText = "Inject Ads";
    const buttonEl = createDOMelement("button", "button", buttonDefaultText);
    const buttonWrapper = createDOMelement("div", "button__wrapper", "");

    buttonEl.addEventListener("click", this.callback);
    buttonEl.title = "[Adsert] Fetch & inject ads";
    buttonEl.text = buttonDefaultText;

    buttonWrapper.appendChild(buttonEl);

    return buttonWrapper;
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
   * @description Updates the button text and destroys the button after timeout
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
