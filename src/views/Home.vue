<template>
  <Presentation
    v-if="presenting"
    @close="presenting = false"
  />
  <Entries v-else @present="launchFullscreen" />
</template>

<script>
import Entries from '../components/Entries.vue';
import Presentation from '../components/presentation.vue';

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
