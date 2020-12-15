<template>
  <section
    class="presentation bg-red-800 text-white text-center"
    tabindex="-1"
    @keydown="handleKeydown"
    @click="handleClick"
    style="background-image: url('./img/christmas/red-bg.jpg');"
  >
    <SnowOverlay />
    <transition appear name="slide-fade">
      <div
        v-if="remaining && identity"
        :key="remaining"
        class="absolute presentation-display px-16 py-4 top-1/2 w-full"
      >
        <h1 v-text="identity.name" class="mb-6 text-9xl"></h1>
        <h3
          class="text-2xl font-semibold"
          v-text="identity.count > 0
            ? `${identity.count} Gifts Remaining`
            : 'Last One, Make It Count'"
        ></h3>
      </div>
      <div class="absolute presentation-display px-16 py-4 top-1/2 w-full" v-else>
        <h1 v-text="'Merry Christmas'" class="mb-4 text-9xl"></h1>
        <h3 v-text="'The End'" class="text-2xl font-bold"></h3>
      </div>
    </transition>
    <div
      v-if="remaining"
      class="bg-black bg-opacity-60 bottom-0 fixed flex font-bold justify-between left-0 px-4 py-2 text-xs w-full"
    >
      <Clock />
      <span v-text="`${ history.length } / ${ remaining + history.length }`"></span>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import SnowOverlay from './SnowOverlay.vue';
import Clock from './Clock.vue';

export default {
  name: 'Presentation',
  components: {
    Clock,
    SnowOverlay,
  },
  computed: {
    remaining() {
      return this.bowl.length;
    },
    identity() {
      return this.list[this.active];
    },
    bowl() {
      const cards = [];
      // for each name in list
      const entries = Object.entries(this.list);

      entries.forEach((data) => {
        const [id, entry] = data;
        // while in count
        for (let i = 0; i < entry.count; i += 1) {
          // add id to bowl
          cards.push(id);
        }
      });

      return this.shuffle(cards);
    },
  },
  data() {
    return {
      list: {},
      history: [],
      previous: null,
      active: null,
    };
  },
  watch: {
    list: {
      handler(list) {
        localStorage.setItem('randomizr', JSON.stringify(list));
      },
      deep: true,
    },
  },
  beforeMount() {
    const stored = JSON.parse(localStorage.getItem('randomizr')) || {};
    this.list = Array.isArray(stored) ? {} : stored;
  },
  mounted() {
    this.startPresentation();
  },
  methods: {
    draw() {
      const { bowl } = this;
      if (bowl.length < 1) return;

      this.previous = this.active;

      const draw = () => bowl[Math.floor(Math.random() * bowl.length)];

      let id = draw();

      // if multiple names remain don't draw the same name as previous
      if ((bowl.length > 1) && (id === this.previous)) {
        id = draw();
      }

      this.active = id;
      this.list[id].count -= 1;
      this.history.push(id);
    },
    shuffle(array) {
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
    },
    handleClick() {
      this.draw();
    },
    handleKeydown(e) {
      switch (e.key) {
        case 'Escape':
          this.$emit('close');
          break;
        case ' ':
        case 'ArrowRight':
        case 'Enter':
        case 'Tab':
          this.draw();
          break;
        default:
          break;
      }
    },
    startPresentation() {
      // begin presentation
      this.presenting = true;

      this.draw();

      const el = this.$el;

      setTimeout(function () { // eslint-disable-line
        el.focus();
      }, 250);
    },
  },
};
</script>

<style lang="scss">
.presentation-display {
  transform: translateY(-50%);
  transform-origin: center;

  h1 {
    font-family: 'ff4';
    font-family: 'ff5';
    font-size: 22.5vw;
    line-height: 0.75;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-duration: 0.5s;
  // transition-timing-function: ease-in-out;
  transition-property: opacity, visibility, transform;
}
.slide-fade-enter,
.slide-fade-leave-to {
  // opacity: 0;
  visibility: hidden;
}
.slide-fade-enter {
  transform: translateY(100vh);
}
.slide-fade-leave-to {
  transform: translateY(-100vh);
}
</style>
