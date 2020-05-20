<template>
  <div id="app">
    <img class="logo" src="./assets/logo1.png" alt="">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.app{
  position: relative;
}
.logo{
  width:300px;
  height: 70px;;
}
</style>
