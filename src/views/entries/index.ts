import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { _tailwind } from "../../utils";
import style from "./style.css?inline";

@customElement("the-entries")
export class TheEntries extends LitElement {
  @state() list: { name: string; uid: string; count: string }[] = JSON.parse(
    localStorage.getItem("randomizr") || "[]"
  );

  @state() name = "";

  @state() count = "1";

  get total() {
    // @ts-ignore
    return this.list.map((i) => parseInt(i.count)).reduce((a, b) => a + b, 0);
  }

  render() {
    return html`
      <h1 class="font-extrabold text-2xl sm:text-3xl md:text-4xl text-center tracking-tight">
        <span
          class="-rotate-6 bg-red-600 inline-block pb-1.5 pt-1 px-2.5 rounded scale-90 text-white transform translate-y-0.5"
        >
          ${this.total}
        </span>
        Gifts Randomizr
      </h1>

      <ul
        @click="${this._clickHandler}"
        class="font-bold gap-4 grid md:grid-cols-3 overflow-auto sm:grid-cols-2"
      >
        ${repeat(
          this.list,
          (item) => item.name,
          (item, index) => html` <li class="flex items-center">
            <input
              class="bg-transparent list-qty focus-visible:outline-none text-right text-xs"
              type="number"
              name="quantity"
              min="0"
              max="99"
              placeholder="1"
              .value="${item.count}"
              @input=${(e: InputEvent) =>
                this.handleInput(item.uid, (e.target as HTMLInputElement).value)}
            />
            <span class="flex-1 mx-2">${item.name}</span>
            <button
              type="button"
              key=${index}
              data-remove=${item.name}
              class="grid h-4 place-content-center rounded-full text-slate-300 text-xs transition-all w-4 scale-75 hover:bg-red-500 hover:scale-100 hover:text-white focus-visible:bg-red-500 focus-visible:outline-none focus-visible:text-white focus-visible:scale-100"
            >
              <svg viewBox="0 0 512 512">
                <path
                  d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z"
                ></path>
              </svg>
            </button>
          </li>`
        )}
      </ul>

      <form class="flex max-w-sm mx-auto w-full" @submit="${this.addName}">
        <input
          class="bg-transparent text-right"
          max="99"
          min="1"
          name="count"
          type="number"
          value=${this.count}
        />
        <input
          class="bg-transparent border-b-2 flex-auto focus-visible:border-red-600 font-bold hover:border-current ml-2 mr-4 outline-none transition-colors"
          placeholder="Name"
          name="name"
          type="text"
          .value=${this.name}
        />
        <button
          class="bg-red-600 font-bold hover:bg-red-800 inline-block px-2.5 py-1 rounded text-white text-xs tracking-tight"
          type="submit"
        >
          Add Name
        </button>
      </form>

      <div class="text-center">
        <button
          class="bg-red-600 btn--enlarge font-bold inline-block px-5 py-2 rounded text-white tracking-tight"
          type="button"
          @click="${this.start}"
        >
          Show
        </button>
      </div>
    `;
  }

  private start() {
    this.dispatchEvent(new CustomEvent("start"));
  }

  private addName = (e: SubmitEvent) => {
    e.preventDefault();

    const log: { name: string; uid: string; count: string } = {
      name: "",
      count: "",
      uid: crypto.randomUUID(),
    };

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    for (const [key, value] of data) {
      // @ts-ignore
      log[key] = value;
    }

    this.list.push(log);

    form.reset();

    this.requestUpdate();
    this.updateStorage();
  };

  private _clickHandler(e: Event) {
    const { remove } = (e.target as HTMLElement).dataset;

    if (remove != null) {
      this.list = this.list.filter((i) => i.name !== remove);

      this.requestUpdate();
      this.updateStorage();
    }
  }

  private handleInput(uid: string, count: string) {
    const target = this.list.find((i) => i.uid === uid);

    if (target == null) {
      return;
    }

    target.count = count;

    this.requestUpdate();
    this.updateStorage();
  }

  private updateStorage() {
    localStorage.setItem("randomizr", JSON.stringify(this.list));
  }

  static styles = [_tailwind, unsafeCSS(style)];
}

declare global {
  interface HTMLElementTagNameMap {
    "the-entries": TheEntries;
  }
}
