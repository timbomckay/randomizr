<template>
  <section
    class="presentation"
    tabindex="-1"
    @keydown="handleKeydown"
    @click="handleClick"
  >
    <SnowOverlay />
    <transition appear name="slide-fade">
      <div
        v-if="remaining && identity"
        :key="remaining"
        class="presentation-display"
      >
        <h1 v-text="identity.name"></h1>
        <h3 v-text="identity.count > 0
          ? `${identity.count} Gifts Remaining`
          : 'Last One, Make It Count'"
        ></h3>
      </div>
      <div class="presentation-display" v-else>
        <h1>Merry Christmas</h1>
        <h3>The End</h3>
      </div>
    </transition>
    <div
      v-if="remaining"
      class="info-bar"
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
.presentation {
  background-color: brown;
  background-image: url('/img/christmas/rawpixel-com-445814-min.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 150%;
  color: white;
  display: grid;
  height: 100vh;
  overflow: hidden;
  padding: 2rem;
  place-content: center;
  position: relative;
  text-align: center;
  text-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.5);

  h1 {
    font-family: 'Mountains of Christmas';
    font-size: 8rem;
    font-weight: normal;
    line-height: 1;
    margin: 0 0 1rem;
    @media screen and (max-width: 600px) {
      font-size: 3rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }
}

.presentation-display {
  width: 100%;
  padding: 1rem 4rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: center;
}

.info-bar {
  background-color: rgba(0,0,0,0.5);
  bottom: 0;
  display: flex;
  font-size: 0.75rem;
  font-weight: bold;
  justify-content: space-between;
  left: 0;
  padding: 0.5rem 1rem;
  position: absolute;
  right: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-duration: 0.5s;
  // transition-timing-function: ease-in-out;
  transition-property: opacity, visibility, transform;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
.slide-fade-enter {
  transform: scale(4, 4) translateY(100vh);
}
.slide-fade-leave-to {
  transform: scale(0.5, 0.5) translateY(-100vh);
}
</style>
