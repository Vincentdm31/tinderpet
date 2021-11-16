<template>
  <div class="gradient h100">
    <div class="h100 d-flex fx-col fx-center vcenter">
      <div v-if="isLoading">
        <div class="spinner txt-white font-s12">
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
      <img
        src="../assets/flamme.png"
        class="responsive-media mt-5 d-block mx-auto"
        style="max-width: 5%"
      />
      <div v-if="data.length == 0" class="d-flex fx-center vcenter">
        <p class="txt-white">No pets available</p>
      </div>

      <div v-else>
        <h1 class="title txt-center txt-white">All pets_</h1>
        <div class="d-flex fx-center">
          <button
            type="button"
            class="btn rounded-1 gradient shadow-3 txt-white mr-3"
            v-if="page != 1"
            @click="page--"
          >
            Previous
          </button>
          <button
            type="button"
            class="btn rounded-1 gradient txt-white shadow-3 mr-3"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            :key="pageNumber"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>

          <button
            type="button"
            @click="page++"
            v-if="page < pages.length"
            class="btn rounded-1 gradient txt-white shadow-3"
          >
            Next
          </button>
        </div>
        <div class="container grix xs1 sm2 md3 lg4 gutter-xs7">
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
            v-for="pet in displayedPets"
            :key="pet.id"
          >
            <div class="card-image">
              <img
                :src="pet.avatarPictureUrl"
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
              <div>{{ pet.firstName }} {{ pet.lastName }}</div>
              <div class="ml-auto">{{ pet.type }}</div>
              <div>
                <p>{{ pet.summary }}</p>
              </div>
            </div>
            <div class="card-footer d-flex fx-row">
              <button class="btn circle gradient" @click="editPet(pet.id)">
                <i class="fas fa-pen txt-white" />
              </button>
              <button
                class="btn circle red dark-4 ml-auto d-block"
                @click="deletePet(pet.id)"
              >
                <i class="fas fa-trash txt-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      @drop="onDrop($event, 0)"
      @dragenter.prevent
      @dragover.prevent
      @drop.prevent
      @dragenter="addHover($event)"
      @dragleave="rmHover($event)"
      class="drag left d-flex vcenter fx-center"
    >
      <i class="fas fa-sad-cry txt-white font-s12"></i>
    </div>
    <div
      @drop="onDrop($event, 1)"
      @dragenter.prevent
      @dragover.prevent
      @drop.prevent
      @dragenter="addHover($event)"
      @dragleave="rmHover($event)"
      class="drag right d-flex vcenter fx-center"
    >
      <i class="fas fa-heart txt-white font-s12" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
  name: 'Home',
  data() {
    return {
      page: 1,
      perPage: 3,
      pages: [],
    };
  },
  computed: {
    ...mapState(['data', 'isLoading', 'likes']),

    displayedPets() {
      return this.paginate(this.data);
    },
  },
  methods: {
    ...mapActions(['delPet', 'likePet']),
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'all';
      event.dataTransfer.effectAllowed = 'all';
      event.dataTransfer.setData('itemId', item.id);
    },
    onDrop(event, zone) {
      event.target.classList.remove('active');
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
      return Vue.axios
        .delete(`/api/pet/${id}`)
        .then((res) => {
          this.delPet(id);
          console.log('res', res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addHover(e) {
      e.target.classList.add('active');
    },
    rmHover(e) {
      e.target.classList.remove('active');
    },
    //
    setPages() {
      let numberOfPages = Math.ceil(this.data.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(pets) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return pets.slice(from, to);
    },
  },
  watch: {
    data() {
      this.setPages();
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

.drag {
  opacity: 0;
  transition: opacity ease 0.3s;
  &.active {
    background: rgba(255, 255, 255, 0.212);
    opacity: 1;
  }
  &.left {
    height: 100%;
    width: 10%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &.right {
    height: 100%;
    width: 10%;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
