<template>
  <div class="gradient">
    <div class="container grix xs1 sm2 md3 lg4 gutter-xs7 mt-5">
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
      <div
        v-else
        class="
          card
          hoverable-2
          grey
          light-4
          shadow-2
          vself-stretch
          rounded-tl4 rounded-br4
        "
        v-for="item in data"
        :key="item.id"
      >
        <div class="card-image">
          <img
            :src="item.avatarPictureUrl"
            alt="logo"
            class="responsive-media"
            style="max-height: 300px"
          />
        </div>
        <div
          class="card-content txt-airforce txt-dark-4 grix xs2"
          style="
            max-height: 150px !important;
            overflow-y: scroll;
            overflow-y: hidden;
          "
        >
          <div>{{ item.firstName }} {{ item.lastName }}</div>
          <div class="ml-auto">{{ item.type }}</div>
          <div>
            <p>{{ item.summary }}</p>
            <p></p>
          </div>
        </div>
        <div class="card-footer d-flex fx-row">
          <button class="btn circle gradient" @click="editPet(item.id)">
            <i class="fas fa-pen txt-white" />
          </button>
          <button
            class="btn circle red dark-4 ml-auto d-block"
            @click="deletePet(item.id)"
          >
            <i class="fas fa-trash txt-white" />
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
  created() {
    this.getAll();
  },
  computed: {
    ...mapState(['data', 'isLoading']),
  },
  methods: {
    ...mapActions(['getAll', 'delPet']),
    editPet(id) {
      this.$router.push({
        path: `/pets/edit/${id}`,
      });
    },
    deletePet(id) {
      console.log(id);
      return Vue.axios
        .delete(`/api/pet/${id}`)
        .then((res) => {
          console.log('ok', res);
          this.delPet(id);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteAllPets() {
      return Vue.axios
        .get('/api/pet/delete/all')
        .then((res) => {
          console.log('ok', res);
          this.getAll();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
</script>
<style lang="scss">
#fab-example {
  position: fixed;
  bottom: 3%;
  right: 3%;
}
</style>
