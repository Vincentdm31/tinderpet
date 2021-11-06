<template>
  <div id="app" class="app">
    <div class="navbar-fixed">
      <nav class="navbar shadow-1 white">
        <div class="navbar-menu mx-auto txt-grey txt-light-4 font-s5">
          <router-link class="navbar-link" to="/"
            ><i class="fas fa-home txt-amaranth"
          /></router-link>
        </div>
      </nav>
    </div>
    <div class="fab" id="fab-example" data-ax="fab">
      <!-- Here is the fab-trigger -->
      <button class="btn circle white large fab-trigger">
        <i class="fas fa-fire txt-amaranth" aria-hidden="true"></i>
      </button>
      <!-- Here is the fab-menu -->
      <div class="fab-menu">
        <router-link class="white btn circle fab-item" to="/pets/insert"
          ><i class="fas fa-plus txt-red"
        /></router-link>
        <button
          class="btn circle mb-4 mt-2 fab-item red dark-2"
          @click="deleteAllPets()"
        >
          <i class="fas fa-trash txt-white" />
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  created() {
    this.getAll();
  },
  computed: {
    ...mapState(['data', 'isLoading']),
    pets() {
      return this.$route.name === 'pets';
    },
  },
  methods: {
    ...mapActions(['getAll', 'delPet']),
  },
});
</script>

<style lang="scss">
.gradient {
  background-image: linear-gradient(151deg, #ec4a79 26%, #fe794b 100%);
}
body {
  --ax-navbar-height: 50px !important;
  background-image: linear-gradient(151deg, #ec4a79 26%, #fe794b 100%);
  font-family: 'Quicksand';
}
.field-input {
  background: transparent !important;
  color: white;
  border: 1px solid #bbb8b8 !important;
}
.field-label {
  color: white !important;
}

.select {
  &:first-child {
    color: rgb(255, 255, 255) !important;
  }
  & option {
    background: #eeeeee !important;
    color: #fe794b;
  }
}

.form-control::placeholder {
  color: #f3f3f3 !important;
}

.title {
  text-transform: uppercase;
  letter-spacing: 30px;
  margin-bottom: 10%;
}

.app {
  height: calc(100vh - 3.5rem);
}
</style>
