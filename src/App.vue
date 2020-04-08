<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
 import Header from './components/Header.vue'

export default {
  name: "App",
  components: {
     Header
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.navbar-dark .navbar-nav .nav-link a {
    color: hsla(0,0%,100%,.5) !important;
}
a:hover {
    color: #0056b3;
    text-decoration: none !important;
}
.navbar-dark .navbar-nav .nav-link:focus, .navbar-dark .navbar-nav .nav-link:hover a{
    color: hsla(0,0%,100%,.75) !important;
}
.main {
  text-align: center;
  margin-top: 60px;
}
</style>
