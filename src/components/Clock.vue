<template>
  <span v-text="`${format(hour)}:${format(min)}`"></span>
</template>

<script>
export default {
  data() {
    return {
      interval: null,
      hour: 0,
      min: 0,
    };
  },
  mounted() {
    this.interval = this.startTimer();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    startTimer() {
      return setInterval(() => {
        if (this.min === 59) {
          this.hour += 1;
          this.min = 0;
        } else {
          this.min += 1;
        }
      }, 60 * 1000);
    },
    format(n) {
      return (`0${n}`).slice(-2);
    },
  },
};
</script>
