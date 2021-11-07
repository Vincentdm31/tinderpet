<template lang="">
  <div class="gradient h100">
    <div>
      <img
        src="../assets/flamme.png"
        class="responsive-media pt-5 mb-5 d-block mx-auto"
        style="max-width: 5%"
      />

      <h1 class="title txt-center txt-white">Likes_</h1>
    </div>
    <div class="container grix xs1 sm2 md3 lg4 gutter-xs7">
      <div
        class="
          card
          hoverable-2
          grey
          light-4
          shadow-2
          vself-stretch
          rounded-tl4 rounded-br4
        "
        v-for="item in likes"
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
        <div class="card-footer">
          <button
            class="btn circle gradient d-block mx-auto"
            @click="unlikePet(item.id)"
          >
            <i class="fas fa-times txt-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['likes']),
  },
  methods: {
    ...mapActions(['unlikePet']),
  },
};
</script>
<style lang=""></style>
