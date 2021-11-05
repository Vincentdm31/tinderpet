<template>
  <div id="app" class="h100">
    <nav class="navbar shadow-1 gradient-2">
      <div class="navbar-menu mx-auto txt-grey txt-light-4 font-s5">
        <router-link class="navbar-link" to="/"
          ><i class="fas fa-home"
        /></router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<style lang="scss">
.gradient-2 {
  background-image: linear-gradient(151deg, #030322 26%, #05031a 100%);
}
.gradient {
  background-image: linear-gradient(151deg, #04030f 26%, #05031a 100%);
}
</style>
