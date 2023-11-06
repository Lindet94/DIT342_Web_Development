<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>
<template>
    <div id="app" style="{ backgroundColor: rgb(143, 176, 79)}">
    <navbarComponent />
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
import navbarComponent from './components/navbarComponent.vue'
export default {
  components: {
    navbarComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgb(112, 112, 112) !important;
  background-image: url("./assets/bar.jpg");
  color: white !important;
}

</style>
