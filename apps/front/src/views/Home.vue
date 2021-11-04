<template>
  <div class="grey light-4 pt-4">
    <h1 class="mt-0 txt-center">Liste des animaux</h1>

    <div class="container grix xs1 sm2 md4 gutter-xs7">
      <div v-if="isLoading">
        <div class="spinner txt-blue">
          <svg viewBox="25 25 50 50">
            <circle
              class="spinner-path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="3"
            />
          </svg>
        </div>
      </div>
      <div v-else class="card shadow-2" v-for="item in data" :key="item.id">
        <div class="card-image">
          <img
            :src="item.avatarPictureUrl"
            alt="logo"
            class="responsive-media"
            style="max-height: 300px"
          />
        </div>
        <div class="card-header">
          <div class="d-flex fx-row">
            <div>{{ item.firstName }} {{ item.lastName }}</div>
            <div class="ml-auto">{{ item.type }}</div>
          </div>
        </div>
        <div
          class="card-content"
          style="max-height: 150px !important; overflow-y: scroll"
        >
          <p>{{ item.summary }}</p>
        </div>
        <div class="card-footer">
          <button class="btn blue" @click="editPet(item.id, item.firstName)">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
  name: 'Home',
  components: {},
  mounted() {
    this.getAll();
  },
  computed: {
    ...mapState(['data', 'isLoading']),
  },
  methods: {
    ...mapActions(['getAll']),
    editPet(id, name) {
      this.$router.push({ path: '/pet/edit/' + id + '/' + name });
    },
  },
});
</script>
