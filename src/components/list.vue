<template>
  <section class="edit-list">
    <header class="header">
      <h1>Gifts Randomizr</h1>
    </header>
    <div class="list">
      <div v-for="person in people" class="list-person" :key="person['.key']" >
        <input
          class="list-qty"
          type="number"
          v-model="person.count"
          name="quantity"
          min="0"
          placeholder="0"
          />
        <label class="list-name">{{ person.name }}</label>
        <div class="list-controls">
          <button class="list-controller--inc" @click="person.count++">
            <svg class="icon"><use xlink:href="#plus" /></svg>
          </button>
          <button
            class="list-controller--dec"
            @click="person.count > 0 ? person.count-- : null">
            <svg class="icon"><use xlink:href="#minus" /></svg>
          </button>
          <button
            class="list-controller--rem"
            @click="removePerson(person)">
            <svg class="icon"><use xlink:href="#close" /></svg>
          </button>
        </div>
      </div>
    </div>
    <form class="form-addPerson" v-on:submit.prevent="addPerson">
      <input class="form-qty"
        type="number"
        v-model="newPerson.count"
        name="quantity"
        min="0"
        placeholder="0"
        />
      <input
        class="form-name"
        type="text"
        v-model="newPerson.name"
        placeholder="Name"
        />
      <input
        class="btn"
        type="submit"
        value="Add Name"
        />
    </form>
    <button @click="startRandomizr" class="btn btn-start">Start</button>
  </section>
</template>
