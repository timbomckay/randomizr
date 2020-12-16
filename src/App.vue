<template>
  <div class="randomizr relative">
    <div class="absolute bg-black bg-opacity-50 focus-within:bg-opacity-100 hover:bg-opacity-100 inline-flex right-2 rounded-3xl text-2xl top-2 z-10 text-white opacity-75 hover:opacity-100 focus-within:opacity-100">
      <button v-if="presenting" @click="presenting = false" class="p-1 outline-none focus:ring">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
      <button @click="fullscreen = !fullscreen" class="p-1 outline-none focus:ring">
        <svg v-if="!fullscreen" class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
        <svg v-else class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
      </button>
    </div>
    <component
      :is="presenting ? 'Presentation' : 'Entries'"
      class="bg-center bg-cover bg-no-repeat edit-list grid h-screen outline-none place-content-center relative"
      @close="presenting = false"
      @present="presenting = true"
    />
  </div>
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
      fullscreen: false,
      presenting: false,
    };
  },
  watch: {
    fullscreen(state) {
      state ? this.launchFullscreen() : this.closeFullscreen();
    },
  },
  methods: {
    launchFullscreen() {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
      }

      element.onfullscreenchange = this.handleFullscreenChange;
    },
    closeFullscreen() {
      if (document.fullscreenElement == null) { return; }

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      }
    },
    handleFullscreenChange() {
      this.fullscreen = (document.fullscreenElement != null);
    }
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

svg.icon {
  fill: currentColor;
  height: 1em;
  width: 1em;
}
</style>
