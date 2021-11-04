<template>
  <div class="about">
    <h1>Créer un animal</h1>
    <div class="d-flex fx-center v-center container fx-col" style="width: 30%">
      <div class="form-field inline">
        <label for="name">Name</label>
        <input v-model="firstName" type="text" class="form-control rounded-1" />
      </div>
      <div class="form-field inline">
        <label for="name">Lastname</label>
        <input v-model="lastName" type="text" class="form-control rounded-1" />
      </div>
      <div class="form-field inline">
        <label for="name">Birthdate</label>
        <input v-model="birthDate" type="text" class="form-control rounded-1" />
      </div>
      <div class="form-field inline">
        <label for="name">Description</label>
        <input v-model="summary" type="text" class="form-control rounded-1" />
      </div>
      <div class="form-field d-flex fx-row">
        <label class="txt-center mr-3" for="select">Type</label>
        <select class="form-control rounded-1" v-model="category">
          <option v-for="type in petType" :key="type.id">{{ type }}</option>
        </select>
      </div>
    </div>
    <button @click="newPet()" class="btn blue d-block mx-auto">Envoyer</button>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      birthDate: '1940-01-01T00:00:00.000Z',
      avatarPictureUrl:
        'https://lezebre.lu/images/detailed/16/22058-bugs-bunny.png',
      coverPictureUrl:
        'https://images2.fanpop.com/image/photos/10200000/Bugs-Bunny-bugs-bunny-10229071-600-811.jpg',
      summary: '',
      category: null,
    };
  },
  mounted() {
    this.getType();
  },
  computed: {
    ...mapState(['petType']),
  },
  methods: {
    ...mapActions(['getAll', 'getType', 'insertNewPet']),
    newPet() {
      const pet = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        avatarPictureUrl: this.avatarPictureUrl,
        coverPictureUrl: this.coverPictureUrl,
        summary: this.summary,
        type: this.category,
      };
      this.insertNewPet(pet);
      this.getAll();
    },
  },
};
</script>
