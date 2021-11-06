<template>
  <div class="gradient app">
    <div
      class="d-flex fx-center v-center container fx-col h100 txt-white"
      style="width: 30%"
    >
    <img src="../assets/flamme.png" class="responsive-media mb-5 d-block mx-auto" style="max-width:20%;" />

    <h1 class="title">Création_</h1>
      <p v-if="errors.length" class="txt-white">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>
  </p>
      <div class="form-field inline d-flex fx-col">
        <input
          v-model="firstName"
          type="text"
          placeholder="Name"
          class="form-control rounded-1"
        />
      </div>
      <div class="form-field inline d-flex fx-col">
        <input
          v-model="lastName"
          type="text"
          placeholder="Lastname"
          class="form-control rounded-1"
        />
      </div>
      <VueCtkDateTimePicker
        :label="'Birthdate'"
        v-model="birthDate"
        :format="'YYYY-MM-DD hh:mm'"
        style="background: transparent !important"
      />
      <div class="form-field inline">
        <input
          v-model="summary"
          type="text"
          placeholder="Summary"
          class="form-control rounded-1"
        />
      </div>
      <div class="form-field inline">
        <input
          v-model="avatarPictureUrl"
          type="text"
          placeholder="Image link"
          class="form-control rounded-1"
        />
      </div>
      <div class="form-field d-flex fx-row">
        <select
          required
          class="form-control select rounded-1"
          placeholder="Category"
          v-model="category"
        >
          <option value="category" disabled hidden>Category</option>
          <option :name="i" v-for="(type, i) in petType" :key="type.id">
            {{ type }}
          </option>
        </select>
      </div>
      <button
        
        @click="checkForm()"
        class="btn gradient txt-white d-block mx-auto"
      >
        Envoyer
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Vue from 'vue';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      birthDate: '2021-11-02 10:10',
      avatarPictureUrl: 'https://picsum.photos/350/250',
      summary: '',
      category: 'category',
      errors: []
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
    checkForm(){
      this.errors = [];
      const data = Object.keys(this.$data).map((key) => [(key), this.$data[key]]);
      data.splice(data.length -1, 1)
      data.map(e => {
          if(e[1].length == 0  || (e[0] == "category" && e[1] == "category")){
            this.errors.push(e[0])
          }
      })

       if(this.errors.length == 0){
         this.newPet()
       }
    },
    newPet() {
      const pet = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        avatarPictureUrl: this.avatarPictureUrl,
        coverPictureUrl: this.avatarPictureUrl,
        summary: this.summary,
        type: this.category,
      };
      this.insertNewPet(pet);
      this.getAll();
      this.$router.push('/');
    },
  },

};
</script>
