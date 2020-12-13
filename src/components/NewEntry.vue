<template>
  <form class="form-addName" @submit.prevent="addName">
    <input
      class="form-qty"
      max="99"
      min="1"
      type="number"
      v-model="count"
    />
    <input
      class="form-name"
      placeholder="Name"
      type="text"
      v-model="name"
      ref="name"
    />
    <button
      class="btn"
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

<style lang="scss">
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
</style>
