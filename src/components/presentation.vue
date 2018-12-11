<template>
  <section class="presentation" v-if="present" @click="iterator++">
    <div v-if="iterator < bowl.length">
      <h1>{{ selected.name }}</h1>
      <h3 v-if="selected.count > 0">{{ selected.count }} Gifts Remaining</h3>
      <h3 v-else>Last One, Make It Count</h3>
    </div>
    <div v-else>
      <h1>Merry Christmas</h1>
      <h3>The End</h3>
    </div>
  </section>
</template>
