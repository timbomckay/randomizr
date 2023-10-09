import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { _tailwind } from "../../utils";
import style from "./style.css?inline";
import "../../components/the-clock";

@customElement("the-presenting")
export class ThePresenting extends LitElement {
  @state() list: { name: string; uid: string; count: string }[] = JSON.parse(
    localStorage.getItem("randomizr") || "[]"
  );

  @state() history = [];

  @state() previous = null;

  @state() active = null;

  total: number | undefined;

  get identity() {
    return this.list.find((i) => i.uid === this.active);
  }

  get bowl() {
    const cards: string[] = [];

    this.list.forEach((data) => {
      // while in count
      for (let i = 0; i < parseInt(data.count); i += 1) {
        // add id to bowl
        cards.push(data.uid);
      }
    });

    if (this.total == null) {
      this.total = cards.length;
    }

    return this._shuffle(cards as []);
  }

  connectedCallback() {
    super.connectedCallback();

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

  private updateStorage() {
    localStorage.setItem("randomizr", JSON.stringify(this.list));
  }

  private _draw() {
    const { bowl } = this;

    if (bowl.length < 1) {
      this.active = null;
      return;
    }

    this.previous = this.active;

    const draw = () => bowl[Math.floor(Math.random() * bowl.length)];

    let id = draw();

    // if multiple names remain don't draw the same name as previous
    if (bowl.length > 1 && id === this.previous) {
      id = draw();
    }

    this.active = id;

    const target = this.list.find((i) => i.uid === id);

    target.count -= 1;

    this.updateStorage();

    this.history.push(id);
  }

  private _shuffle(array: []) {
    // source: Fisher-Yates Shuffle - https://bost.ocks.org/mike/shuffle/
    /* eslint-disable */
    let m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
    /* eslint-enable */
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
