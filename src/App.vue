<template>
  <component
    :is="presenting ? 'Presentation' : 'Entries'"
    class="bg-center bg-no-repeat edit-list grid h-screen outline-none p-8 place-content-center randomizr relative"
    @close="presenting = false"
    @present="launchFullscreen"
  />
</template>

<script>
import Entries from './components/Entries.vue';
import Presentation from './components/presentation.vue';

export default {
  name: 'home',
  components: {
    Entries,
    Presentation,
  },
  data() {
    return {
      presenting: false,
    };
  },
  methods: {
    launchFullscreen() {
      this.presenting = true;

      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
  },
};
</script>

<style lang="scss">
@tailwind base;

html {
  font-size: calc((100vw - 600px ) / 640 * 5 + 19px);
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;

  @media screen and (max-width: 600px) {
    font-size: 19px;
  }

  @media (min-width: 1240px) {
    font-size: 24px;
  }

  * {
    box-sizing: inherit;
    &:before, &:after {
      box-sizing: inherit;
    }
  }
}

body {
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  line-height: 1.25;
  color: #37474F;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

@tailwind components;
@tailwind utilities;

.randomizr {
  background-size: auto 150%;

  @media screen and (max-width: 600px) {
    background-size: cover;
  }
}

svg.icon {
  fill: currentColor;
  height: 1em;
  width: 1em;
}
</style>
