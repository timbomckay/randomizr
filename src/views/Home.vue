<template>
  <section class="edit-list" v-if="!presenting">
    <header class="header">
      <h1>Gifts Randomizr</h1>
    </header>
    <div class="list">
      <div v-for="(item, k) in list" class="list-name" :key="k" >
        <input class="list-qty" type="number" name="quantity" min="1" placeholder="1"
          v-model="item.count" />
        <label class="list-name">{{ item.name }}</label>
        <div class="list-controls">
          <button class="list-controller--inc" @click="item.count++">
            <svg class="icon"><use xlink:href="#plus" /></svg>
          </button>
          <button class="list-controller--dec" @click="item.count > 0 ? item.count-- : null">
            <svg class="icon"><use xlink:href="#minus" /></svg>
          </button>
          <button class="list-controller--rem" @click="removeName(k)">
            <svg class="icon"><use xlink:href="#close" /></svg>
          </button>
        </div>
      </div>
    </div>
    <form class="form-addName" v-on:submit.prevent="addName">
      <input class="form-qty" type="number" name="quantity" min="1" placeholder="1"
        v-model="newName.count" />
      <input class="form-name" type="text" placeholder="Name" v-model="newName.name" />
      <input class="btn" type="submit" value="Add Name" />
    </form>
    <button @click="startPresentation" class="btn btn-start">Start</button>
  </section>
  <section class="presentation" v-else-if="presenting" @click="next">
    <div v-if="bowl.length">
      <h1>{{ list[bowl[0]].name }}</h1>
      <h3 v-if="list[bowl[0]] && list[bowl[0]].count">{{ list[bowl[0]].count }} Gifts Remaining</h3>
      <h3 v-else>Last One, Make It Count</h3>
    </div>
    <div v-else>
      <h1>Merry Christmas</h1>
      <h3>The End</h3>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import list from '@/components/list.vue';
// import presentation from '@/components/presentation.vue';

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
      // for each name in list
      this.list.forEach((item, index) => {
        // while in count
        for (let i = 0; i < item.count; i += 1) {
          // add item to bowl
          cards.push(index);
        }
      });
      // shuffle cards and put in bowl
      this.bowl = this.shuffle(cards);
      // begin presentation
      this.presenting = true;
      // decrement first pick
      this.list[this.bowl[0]].count -= 1;
      // launch fullscreen
      this.launchFullscreen(document.documentElement);
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
  },
};
</script>
