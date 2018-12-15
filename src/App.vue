<template>
  <div id="app" class="randomizr">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  font-size: calc((100vw - 600px ) / 640 * 5 + 19px);
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;

  @media screen and (max-width: 600px) {
    font-size: 19px;
  }

  @media (min-width: 1240px) {
    font-size: 24px;
  }

  * {
    box-sizing: inherit;
    &:before, &:after {
      box-sizing: inherit;
    }
  }
}

body {
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  line-height: 1.25;
  color: #37474F;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

svg.icon {
  fill: currentColor;
  height: 1em;
  width: 1em;
}

.btn {
  font-weight: bold;
  cursor: pointer;
  font-size: 0.75rem;
  display: inline-block;
  border: 0;
  border-radius: 3px;
  background-color: #F44336;
  color: white;
  padding: 0.5em 0.75em;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: transform, box-shadow;
  &:hover {}
}

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

.randomizr {
  background-image: url('https://images.unsplash.com/photo-1510284876186-b1a84b94418f?auto=format&fit=crop&w=1680&q=80');
  background-size: auto 150%;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 600px) {
    background-image: url('https://images.unsplash.com/photo-1510284876186-b1a84b94418f?auto=format&fit=crop&w=1024&q=80');
    background-size: cover;
  }
}

</style>
