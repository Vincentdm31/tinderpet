<template>
  <div class="gradient d-flex fx-col fx-center vcenter h100">
    <h1 class="mt-0 txt-white" style="font-size: 10rem">Tinderpet</h1>
    <img src="../assets/flamme.png" class="responsive-media my-5" />
    <router-link
      class="
        btn
        gradient
        txt-white
        font-s5
        mt-5
        rounded-1
        bd-solid bd-white bd-1
      "
      to="/pets"
      >START
    </router-link>
  </div>
</template>
<style lang="scss">
.btn {
  transition: transform ease 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
