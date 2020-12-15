<template>
  <section class="gap-10 p-4" style="background-image: url('./img/christmas/gifts-light.jpg');">
    <h1 class="font-extrabold text-2xl sm:text-3xl md:text-4xl text-center tracking-tight">
      <span v-text="total" class="-rotate-6 bg-red-600 inline-block pb-1.5 pt-1 px-2.5 rounded scale-90 text-white total-gifts transform translate-y-0.5"></span>
      Gifts Randomizr
    </h1>
    <div class="font-bold gap-4 grid md:grid-cols-3 overflow-auto sm:grid-cols-2">
      <div
        v-for="(item, id, index) in list"
        class="flex items-center"
        :key="index"
      >
        <input
          class="bg-transparent list-qty focus:outline-none text-right text-xs"
          type="number"
          name="quantity"
          min="0"
          max="99"
          placeholder="1"
          v-model="item.count"
        />
        <span class="flex-1 mx-2" v-text="item.name"></span>
        <button class="grid h-4 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white remove md:invisible md:opacity-0 focus:outline-none place-content-center rounded-full text-gray-300 text-xs transition-all w-4" @click="removeName(id)">
          <svg class="icon" viewBox="0 0 512 512"><path d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z"></path></svg>
        </button>
      </div>
    </div>
    <NewEntry @push="addName($event)" />
    <div class="text-center">
      <button
        @click="$emit('present')"
        class="bg-red-600 btn--enlarge font-bold inline-block px-5 py-2 rounded text-white tracking-tight"
        type="button"
        v-text="'Start'"
      ></button>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import NewEntry from './NewEntry.vue';

export default {
  name: 'Entries',
  components: {
    NewEntry,
  },
  computed: {
    total() {
      const entries = Object.values(this.list);
      let total = 0;

      entries.forEach((entry) => {
        total += parseInt(entry.count, 36);
      });

      return total;
    },
  },
  data() {
    return {
      list: {},
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
  mounted() {
    const stored = JSON.parse(localStorage.getItem('randomizr')) || {};
    this.list = Array.isArray(stored) ? {} : stored;
  },
  methods: {
    addName(data) {
      const { uid, ...rest } = data;
      Vue.set(this.list, uid, rest);
    },
    removeName(id) {
      Vue.delete(this.list, id);
    },
  },
};
</script>

<style lang="scss">
.btn--enlarge {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: transform, box-shadow;

  &:hover {
    transform: translateY(-0.25em) scale(1.125, 1.125);
    box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.2);
  }
}

.remove {
  :hover > &,
  :focus-within > & {
    opacity: 1;
    visibility: visible;
  }
}
</style>
