import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { _tailwind, stackGenerator, getStorage, updateStorage } from "../../utils";
import style from "./style.css?inline";
import "../../components/the-clock";

@customElement("the-presenting")
export class ThePresenting extends LitElement {
  @state() list = getStorage();

  @state()
  history: string[] = [];

  @state()
  active: string | null | void = null;

  stack = stackGenerator();

  total = 0;

  get identity() {
    return this.list.find((i) => i.uid === this.active);
  }

  connectedCallback() {
    super.connectedCallback();

    this.total = this.list.map((x) => parseInt(x.count)).reduce((acc, curr) => acc + curr, 0);

    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeydown);

    this._draw();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeydown);

    super.disconnectedCallback();
  }

  titleTemplate() {
    if (this.identity == null) {
      return html`<h1 class="text-[10rem]">Merry Christmas</h1>`;
    }

    return html`
      <h1>${this.identity?.name}</h1>
      <h2>
        ${this.identity?.count
          ? this.identity?.count + " gifts remaining"
          : "Last One Make It Count"}
      </h2>
    `;
  }

  clockTemplate() {
    return html`<div
      class="absolute bottom-0 left-0 right-0 px-4 py-2 text-xs font-bold bg-slate-950 bg-opacity-60 flex"
    >
      <the-clock></the-clock>
      <span class="ml-auto">${this.history.length}/${this.total}</span>
    </div>`;
  }

  render() {
    return html`${this.titleTemplate()}${this.clockTemplate()}`;
  }

  private end() {
    this.dispatchEvent(new CustomEvent("end"));
  }

  private _draw() {
    this.active = this.stack.next().value;

    if (this.active != null) {
      this.history.push(this.active);

      const target = this.list.find((i) => i.uid === this.active);

      // @ts-ignore
      target.count -= 1;

      updateStorage(this.list);
    }
  }

  private _handleClick = () => {
    this._draw();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        this.end();
        break;
      case " ":
      case "ArrowRight":
      case "Enter":
      case "Tab":
        this._draw();
        break;
      default:
        break;
    }
  };

  static styles = [_tailwind, unsafeCSS(style)];
}

declare global {
  interface HTMLElementTagNameMap {
    "the-presenting": ThePresenting;
  }
}
