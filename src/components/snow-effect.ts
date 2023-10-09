import { html, LitElement, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("snow-effect")
export class SnowEffect extends LitElement {
  render() {
    return html`<canvas></canvas>`;
  }

  firstUpdated() {
    const canvas = this.renderRoot.querySelector("canvas");

    const animFrame = window.requestAnimationFrame;

    const defaultOptions = {
      color: "#ffffff",
      radius: [0.5, 4.0],
      speed: [1, 4],
      wind: [-0.5, 3.0],
    };

    const SnowItem = (canvas, drawFn = null, opts) => {
      const options = { ...defaultOptions, ...opts };
      const { radius, speed, wind, color } = options; // eslint-disable-line
      const random = (a = 1, b = 0) => {
        const lower = Math.min(a, b);
        const upper = Math.max(a, b);
        return lower + Math.random() * (upper - lower);
      };

      const params = {
        color,
        x: random(0, canvas.offsetWidth),
        y: random(-canvas.offsetHeight, 0),
        radius: random(...radius),
        speed: random(...speed),
        wind: random(...wind),
        isResized: false,
      };
      const ctx = canvas.getContext("2d");

      const updateData = () => {
        params.x = random(0, canvas.offsetWidth);
        params.y = random(-canvas.offsetHeight, 0);
      };

      const resized = () => (params.isResized = true); // eslint-disable-line

      const drawDefault = () => {
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
        ctx.fillStyle = params.color;
        ctx.fill();
        ctx.closePath();
      };

      const draw = drawFn ? () => drawFn(ctx, params) : drawDefault;

      const translate = () => {
        params.y += params.speed;
        params.x += params.wind;
      };

      const onDown = () => {
        if (params.y < canvas.offsetHeight) return;

        if (params.isResized) {
          updateData();
          params.isResized = false;
        } else {
          params.y = 0;
          params.x = random(0, canvas.offsetWidth);
        }
      };

      const update = () => {
        translate();
        onDown();
      };

      return {
        update,
        resized,
        draw,
      };
    };

    const Snow = (canvas, count) => {
      const ctx = canvas.getContext("2d");
      const snowflakes = [];

      const add = (item) => snowflakes.push(item(canvas));

      const update = () => snowflakes.forEach((el) => el.update());

      const resize = () => {
        ctx.canvas.width = canvas.offsetWidth;
        ctx.canvas.height = canvas.offsetHeight;
        snowflakes.forEach((el) => el.resized());
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        snowflakes.forEach((el) => el.draw());
      };

      const events = () => {
        window.addEventListener("resize", resize);
      };

      const loop = () => {
        draw();
        update();
        animFrame(loop);
      };

      const init = () => {
        Array.from({ length: count }, () => add((canvas) => SnowItem(canvas))); // eslint-disable-line
        events();
        loop();
      };

      init(count);
      resize();

      return { add, resize };
    };

    Snow(canvas, 150);
  }

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    canvas {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  `;
}
