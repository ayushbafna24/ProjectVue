<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Kendo UI</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/user">UserData</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/chart">Chart</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/scheduler">Scheduler</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/logkeeping">LogKeeping</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
