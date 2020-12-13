<template>
  <section class="edit-list">
    <header class="header">
      <h1><span v-text="total" class="total-gifts"></span> Gifts Randomizr</h1>
    </header>
    <div class="list" :class="{ [`list-cols${list.length}`]: list.length < 4 }">
      <div
        v-for="(item, id, index) in list"
        class="list-item"
        :key="index"
      >
        <input
          class="list-qty"
          type="number"
          name="quantity"
          min="0"
          max="99"
          placeholder="1"
          v-model="item.count"
        />
        <span class="list-name">{{ item.name }}</span>
        <button class="list-item--remove" @click="removeName(id)">
          <svg class="icon"><use xlink:href="#close" /></svg>
        </button>
      </div>
    </div>
    <NewEntry @push="addName($event)" />
    <button
      @click="$emit('present')"
      class="btn btn-start"
      type="button"
      v-text="'Start'"
    ></button>
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
  background-image: url('/img/christmas/caley-dimmock-442468.jpg');
  background-size: auto 150%;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    background-size: cover;
  }

  h1 {
    font-size: 2rem;
    margin-top: 0;
  }
}

.list {
  width: 100%;
  max-width: 36rem;
  margin-bottom: 3rem;
  overflow-y: auto;

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

.total-gifts {
  padding: 0.4rem 0.6rem;
  background-color: #F44336;
  color: white;
  transform: scale(0.9) rotate(-6deg) translateY(3px);
  display: inline-block;
  border-radius: 4px;
}
</style>
