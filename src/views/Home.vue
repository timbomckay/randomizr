<template>
  <section v-if="!presenting" class="edit-list">
    <header class="header">
      <h1>Gifts Randomizr</h1>
    </header>
    <div :class="listClasses">
      <div v-for="(item, k) in list" class="list-item" :key="k" >
        <input class="list-qty" type="number" name="quantity" min="1" max="99" placeholder="1"
          v-model="item.count" />
        <span class="list-name">{{ item.name }}</span>
        <button class="list-item--remove" @click="removeName(k)">
          <svg class="icon"><use xlink:href="#close" /></svg>
        </button>
      </div>
    </div>
    <form class="form-addName" v-on:submit.prevent="addName">
      <input class="form-qty" type="number" name="quantity" min="1" max="99" placeholder="1"
        v-model="newName.count" />
      <input class="form-name" type="text" placeholder="Name" v-model="newName.name" />
      <button class="btn" type="submit">
        Add Name
      </button>
    </form>
    <button @click="startPresentation" class="btn btn-start">Start</button>
  </section>
  <section v-else-if="presenting" class="presentation" tabindex="-1"
    @keydown="keyPressed" @click="next">
    <snow />
    <transition appear name="slide-fade">
      <div class="presentation-display" v-if="bowl.length" :key="bowl.length">
        <h1>{{ list[bowl[0]].name }}</h1>
        <h3 v-if="list[bowl[0]] && list[bowl[0]].count">
          {{ list[bowl[0]].count }} Gifts Remaining
        </h3>
        <h3 v-else>Last One, Make It Count</h3>
      </div>
      <div class="presentation-display" v-else>
        <h1>Merry Christmas</h1>
        <h3>The End</h3>
      </div>
    </transition>
  </section>
</template>

<script>
// @ is an alias to /src
// import list from '@/components/list.vue';
// import presentation from '@/components/presentation.vue';
import snow from '@/components/snow.vue';

// function exitFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.mozCancelFullScreen) {
//     document.mozCancelFullScreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   }
// }

const listStorage = {
  fetch() {
    return JSON.parse(localStorage.getItem('randomizr')) || [];
  },
  save(list) {
    localStorage.setItem('randomizr', JSON.stringify(list));
  },
};

export default {
  name: 'home',
  components: {
    // list,
    // presentation,
    snow,
  },
  data() {
    return {
      newName: {
        name: '',
        count: 1,
      },
      list: listStorage.fetch(),
      bowl: [],
      previous: [],
      presenting: false,
    };
  },
  computed: {
    listClasses() {
      return [
        'list',
        this.list.length < 4 ? `list-cols${this.list.length}` : '',
      ];
    },
  },
  watch: {
    list: {
      handler(list) {
        listStorage.save(list);
      },
      deep: true,
    },
  },
  methods: {
    guid() {
      // source: https://gist.github.com/LeverOne/1308368
      function uid(a,b){for(b=a='';a++<4;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'');return b} // eslint-disable-line
      // create unique id
      let id = uid();
      // ensure id doesn't exist
      while (this.list[id]) {
        id = uid();
      }
      // return unique id
      return id;
    },
    shuffle(array) {
      // source: Fisher-Yates Shuffle - https://bost.ocks.org/mike/shuffle/
      /* eslint-disable */
      let m = array.length, t, i;
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
    launchFullscreen(element) {
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
    addName() {
      // TODO: Focus name input after submission
      if (this.newName.name.trim()) {
        this.list.push({
          id: this.guid(),
          name: this.newName.name,
          count: this.newName.count,
        });
        // reset input fields
        this.resetForm();
      }
    },
    removeName(key) {
      this.list.splice(key, 1);
    },
    resetForm() {
      this.newName.name = '';
      this.newName.count = 1;
    },
    startPresentation() {
      const cards = [];
      const vm = this;
      // for each name in list
      vm.list.forEach((item, index) => {
        // while in count
        for (let i = 0; i < item.count; i += 1) {
          // add item to bowl
          cards.push(index);
        }
      });
      // shuffle cards and put in bowl
      vm.bowl = vm.shuffle(cards);
      // begin presentation
      vm.presenting = true;
      // decrement first pick
      vm.list[vm.bowl[0]].count -= 1;
      // launch fullscreen
      vm.launchFullscreen(document.documentElement);

      setTimeout(function () { // eslint-disable-line
        vm.$el.focus();
      }, 250);
    },
    next() {
      // remove from bowl
      const prev = this.bowl.shift();
      // push to history
      this.previous.push(prev);
      // if bowl still has items
      if (this.bowl.length) {
        const next = this.bowl[0];
        this.list[next].count -= 1;
      }
    },
    keyPressed(e) {
      switch (e.key) {
        case 'Escape':
          this.presenting = false;
          break;
        default:
          this.next();
      }
    },
  },
};
</script>

<style lang="scss">

.btn-start {
  font-size: 1rem;
  padding: 0.5rem 1.25rem;
  text-transform: uppercase;
  background-color: #F44336;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
  flex: 0 0 auto;
  &:hover {
    transform: translateY(-0.25em) scale(1.125, 1.125);
    box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.2);
  }
}

.edit-list {
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 2rem;
    margin-top: 0;
  }
}

.form-addName {
  margin-bottom: 2rem;
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  max-width: 25rem;

  @media screen and (max-width: 460px) {
    .btn {
      font-size: 0;
      padding: 0.6rem 0.5rem 0.5rem;
      line-height: 0;

      &:after {
        content: "+";
        font-size: 1rem;
      }
    }
  }
}

.form-qty, .form-name {
  border: 0;
}

.form-qty:focus, .form-name:focus {
  outline: 0;
}

.form-qty {
  font-size: 1rem;
  width: 2em;
  text-align: right;

  @media screen and (min-width: 460px) {
    width: 3em;
  }
}

.form-name {
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #CFD8DC;
  margin-left: 0.5rem;
  margin-right: 1rem;
  flex: 1 1 auto;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: currentColor;
  }

  &:focus {
    border-color: #F44336;
  }
}

.list {
  width: 100%;
  max-width: 36rem;
  margin-bottom: 3rem;
  overflow-y: scroll;

  @media screen and (min-width: 400px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &-item {
    display: flex;
    align-items: center;
    font-weight: bold;
    width: 100%;
    position: relative;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;

    @media screen and (min-width: 460px) {
      flex: 0 0 50%;
    }

    @media screen and (min-width: 640px) {
      flex-basis: 33.33%;
    }
  }

  &-qty {
    border: 0;
    font-size: 0.75rem;
    flex: 0 0 2.5em;
    margin-right: 0.5rem;
    text-align: right;
    background-color: transparent;
  }
}

.list-name {
  flex: 1;
}

.list-item--remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  padding: 0;
  font-size: 0.675rem;
  border: 0;
  color: #ccc;
  background-color: transparent;

  @media screen and (min-width: 540px) {
    opacity: 0;
    visibility: hidden;
    cursor: pointer;
    transition-property: color, background-color, visibility, opacity;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;

    &:hover {
      color: white;
      background-color: #F44336;
    }

    .list-item:hover & {
      opacity: 1;
      visibility: visible;
    }
  }

}

.presentation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  text-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2rem;
  background-image: url('https://images.unsplash.com/photo-1510547721131-2118691e1930?auto=format&fit=crop&w=1680&q=80');
  background-size: auto 150%;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  position: relative;

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
  position: absolute;
  max-width: calc(100% - 4rem);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-property: opacity, visibility, transform;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
.slide-fade-enter {
  transform: scale(5, 5) translateY(20vh);
}
.slide-fade-leave-to {
  transform: scale(0.5, 0.5) translateY(-50vh);
}

</style>
