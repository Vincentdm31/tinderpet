<template lang="">
  <div>
    <p>{{ id }}</p>
    <p>{{ name }}</p>
    <p>MODIFIER LE PRENOM</p>
    <div class="form-field inline">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        class="form-control rounded-1"
        placeholder="Rentrez le novueau nom"
        v-model="newName"
      />
    </div>
    <button class="btn outline txt-blue" @click="editPet(id)">
      <span class="outline-text">Edit</span>
    </button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      newName: '',
    };
  },
  mounted() {
    console.log(this.id);
  },
  methods: {
    editPet(id) {
      return axios
        .post(`/api/pet/editPet`, {
          id: id,
          firstName: this.newName,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang=""></style>
