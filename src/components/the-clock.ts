import { LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("the-clock")
export class TheClock extends LitElement {
  @state() value = 0;
  hours = false;
  private timer?: number | NodeJS.Timer;

  connectedCallback() {
    super.connectedCallback();

    // Start a timer when the host is connected
    this.timer = setInterval(() => {
      this.value++;
    }, 1000); // increment each second
  }

  disconnectedCallback() {
    // Clear the timer when the host is disconnected
    clearInterval(this.timer);
    this.timer = undefined;
    super.disconnectedCallback();
  }

  render() {
    const num = this.value;
    const pad = (n: number) => ("00" + n).slice(-2);
    const hours = Math.floor(num / 60);
    const min = num % 60;
    return pad(hours) + ":" + pad(min);
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("value")) {
      if (!this.hours) {
        if (this.value >= 3600) {
          this.hours = true;
          this.value = 60;

          clearInterval(this.timer);

          this.timer = setInterval(() => {
            this.value++;
          }, 60 * 1000); // increment each minute

          console.log("switch to hours");
        }
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "the-clock": TheClock;
  }
}
