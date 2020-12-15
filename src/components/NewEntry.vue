<template>
  <form class="flex max-w-sm mx-auto w-full" @submit.prevent="addName">
    <input
      class="bg-transparent text-right"
      max="99"
      min="1"
      type="number"
      v-model="count"
    />
    <input
      class="bg-transparent border-b-2 flex-auto focus:border-red-600 font-bold hover:border-current ml-2 mr-4 outline-none transition-colors"
      placeholder="Name"
      ref="name"
      type="text"
      v-model="name"
    />
    <button
      class="bg-red-600 font-bold hover:bg-red-800 inline-block px-2.5 py-1 rounded text-white text-xs tracking-tight"
      type="submit"
      v-text="'Add Name'"
    ></button>
  </form>
</template>

<script>
export default {
  name: 'NewNameForm',
  data() {
    return {
      name: '',
      count: 1,
    };
  },
  methods: {
    guid() {
      // source: https://gist.github.com/LeverOne/1308368
      function uid(a,b){for(b=a='';a++<4;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'');return b} // eslint-disable-line
      // create unique id
      return uid();
    },
    addName() {
      if (this.name.trim()) {
        this.$emit('push', {
          uid: this.guid(),
          name: this.name,
          count: this.count,
        });

        // reset input fields
        this.resetForm();
      }
    },
    resetForm() {
      this.name = '';
      this.count = 1;
      if (this.$refs.name != null) {
        this.$refs.name.focus();
      }
    },
  },
};
</script>