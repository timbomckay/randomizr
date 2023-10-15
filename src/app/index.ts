import { LitElement, html, unsafeCSS, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { _tailwind } from "../utils";
import style from "./style.css?inline";
import "../views/entries";
import "../views/presenting";
import "../components/snow-effect";

const el = document.documentElement;

@customElement("the-app")
export class TheApp extends LitElement {
  @property({ type: Boolean, reflect: true })
  presenting = false;

  @state() fullscreen = false;

  controlsTemplate() {
    return html`
      <div
        class="absolute bg-black bg-opacity-50 focus-within:bg-opacity-100 hover:bg-opacity-100 inline-flex right-2 rounded-3xl text-xl top-2 z-10 text-white opacity-75 hover:opacity-100 focus-within:opacity-100"
      >
        ${!this.presenting
          ? nothing
          : html`<button
              @click=${this.toggle}
              class="p-1 outline-none focus-visible:ring rounded-3xl"
            >
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>`}
        <button
          @click=${this.toggleFullscreen}
          class="p-1 outline-none focus-visible:ring rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            class="icon"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
            ></path>
          </svg>
        </button>
      </div>
    `;
  }

  render() {
    if (!this.presenting)
      return html`
        ${this.controlsTemplate()}
        <the-entries @start=${this.toggle}></the-entries>
      `;

    return html`
      <snow-effect></snow-effect>
      ${this.controlsTemplate()}
      <the-presenting @end=${this.toggle}></the-presenting>
    `;
  }

  private toggle() {
    this.presenting = !this.presenting;
  }

  private toggleFullscreen() {
    this.fullscreen = !this.fullscreen;

    if (this.fullscreen) {
      el.requestFullscreen();
      el.addEventListener("fullscreenchange", this.handleFullscreenChange);
      return;
    }

    document.exitFullscreen();
  }

  handleFullscreenChange() {
    this.fullscreen = document.fullscreenElement != null;

    if (!this.fullscreen) {
      el.removeEventListener("fullscreenchange", this.handleFullscreenChange);
    }
  }

  static styles = [_tailwind, unsafeCSS(style)];
}

declare global {
  interface HTMLElementTagNameMap {
    "the-app": TheApp;
  }
}
