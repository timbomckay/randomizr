<template>
  <canvas id="snow" style="position:absolute;height:100%;width:100%;"></canvas>
</template>

<script>
export default {
  mounted() {
    const animFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame;

    const defaultOptions = {
      color: '#ffffff',
      radius: [0.5, 3.0],
      speed: [1, 3],
      wind: [-0.5, 3.0],
    };

    const SnowItem = (canvas, drawFn = null, opts) => {
      const options = { ...defaultOptions, ...opts };
      const { radius, speed, wind, color } = options; // eslint-disable-line
      const params = {
        color,
        x: this.random(0, canvas.offsetWidth),
        y: this.random(-canvas.offsetHeight, 0),
        radius: this.random(...radius),
        speed: this.random(...speed),
        wind: this.random(...wind),
        isResized: false,
      };
      const ctx = canvas.getContext('2d');

      const updateData = () => {
        params.x = this.random(0, canvas.offsetWidth);
        params.y = this.random(-canvas.offsetHeight, 0);
      };

      const resized = () => params.isResized = true; // eslint-disable-line

      const drawDefault = () => {
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
        ctx.fillStyle = params.color;
        ctx.fill();
        ctx.closePath();
      };

      const draw = drawFn
        ? () => drawFn(ctx, params)
        : drawDefault;

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
          params.x = this.random(0, canvas.offsetWidth);
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
      const ctx = canvas.getContext('2d');
      const snowflakes = [];

      const add = item => snowflakes.push(item(canvas));

      const update = () => snowflakes.forEach(el => el.update());

      const resize = () => {
        ctx.canvas.width = canvas.offsetWidth;
        ctx.canvas.height = canvas.offsetHeight;
        snowflakes.forEach(el => el.resized());
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        snowflakes.forEach(el => el.draw());
      };

      const events = () => {
        window.addEventListener('resize', resize);
      };

      const loop = () => {
        draw();
        update();
        animFrame(loop);
      };

      const init = () => {
        Array.from({ length: count }, () => add(canvas => new SnowItem(canvas))); // eslint-disable-line
        events();
        loop();
      };

      init(count);
      resize();

      return { add, resize };
    };

    Snow(this.$el, 150);
  },
  methods: {
    random(a = 1, b = 0) {
      const lower = Math.min(a, b);
      const upper = Math.max(a, b);
      return lower + Math.random() * (upper - lower);
    },
  }
};
</script>
