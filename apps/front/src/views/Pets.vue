<template>
  <div class="gradient app">
    <div v-if="data.length == 0" class="d-flex fx-center vcenter h100">
      <p class="txt-white">No pets available</p>
    </div>
    <div class="">
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
      <div class="container grix xs1 sm2 md3 lg4 gutter-xs7 mt-5" v-else>
        <div class="col-lg4 col-md3 col-sm2">
          <img
            src="../assets/flamme.png"
            class="responsive-media my-5 d-block mx-auto"
            style="max-width: 5%"
          />

          <h1 class="title txt-center txt-white">All pets_</h1>
        </div>
        <div
          draggable="true"
          @dragstart="startDrag($event, item)"
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
        <div
          @drop="onDrop($event, 0)"
          @dragenter.prevent
          @dragover.prevent
          @drop.prevent
          class="green"
          style="height: 100%; width: 5%; position: absolute; top: 0; left: 0"
        ></div>
        <div
          @drop="onDrop($event, 1)"
          @dragenter.prevent
          @dragover.prevent
          @drop.prevent
          class="red"
          style="height: 100%; width: 5%; position: absolute; top: 0; right: 0"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
  name: 'Home',

  computed: {
    ...mapState(['data', 'isLoading', 'likes']),
  },
  methods: {
    ...mapActions(['delPet', 'likePet']),
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'all';
      event.dataTransfer.effectAllowed = 'all';
      event.dataTransfer.setData('itemId', item.id);
    },
    onDrop(event, zone) {
      const itemID = event.dataTransfer.getData('itemID');
      let elem = this.data.find((el) => el.id == itemID);
      zone == 1 ? this.likePet(elem) : this.deletePet(itemID);
    },
    editPet(id) {
      this.$router.push({
        path: `/pets/edit/${id}`,
      });
    },
    mouseDown(el) {
      const card = el.target;
      console.log(card.closest('.card'));
    },
    mouseClick(el) {
      const card = el.target;
      console.log('test', card.closest('.card'));
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
