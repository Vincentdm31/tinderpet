<template>
  <div id="app" class="h100">
    <nav class="navbar shadow-1 primary">
      <a href="#" target="_blank" class="navbar-brand">TinderPet</a>
      <div class="navbar-menu ml-auto">
        <router-link class="navbar-link" to="/">Home</router-link>
        <router-link class="navbar-link" to="/insert">Créer</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>
