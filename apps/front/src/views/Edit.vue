<template lang="">
  <div class="h100 w100 p-2" style="height: 94vh">
    <div
      class="container d-flex fx-center fx-col v-center h100"
      style="width: 30%"
    >
      <p v-if="errors.length" class="txt-red">
        <b>Please correct the following error(s):</b>
      </p>

      <ul>
        <li class="txt-red" v-for="error in errors" :key="error.id">
          {{ error }}
        </li>
      </ul>
      <div class="form-field inline">
        <input
          type="text"
          id="name"
          class="form-control rounded-1"
          :placeholder="pet.firstName"
          v-model="pet.firstName"
        />
      </div>
      <div class="form-field inline">
        <input
          type="text"
          id="name"
          class="form-control rounded-1"
          :placeholder="pet.lastName"
          v-model="pet.lastName"
        />
      </div>
      <VueCtkDateTimePicker
        :label="pet.birthDate"
        :color="'white'"
        v-model="pet.birthDate"
        :format="'YYYY-MM-DD hh:mm'"
      />
      <div class="form-field inline">
        <input
          type="text"
          id="name"
          class="form-control rounded-1"
          :placeholder="pet.summary"
          v-model="pet.summary"
        />
      </div>
      <div class="form-field inline">
        <input
          type="text"
          id="name"
          class="form-control rounded-1"
          :placeholder="pet.avatarPictureUrl"
          v-model="pet.avatarPictureUrl"
        />
      </div>
      <div class="form-field inline">
        <input
          type="text"
          id="name"
          class="form-control rounded-1"
          :placeholder="pet.coverPictureUrl"
          v-model="pet.coverPictureUrl"
        />
      </div>
      <div class="form-field d-flex fx-row">
        <select
          required
          class="form-control rounded-1"
          placeholder="Category"
          v-model="pet.type"
        >
          <option :name="i" v-for="(type, i) in petType" :key="type.id">
            {{ type }}
          </option>
        </select>
      </div>
      <div>
        <button class="btn gradient d-block mx-auto" @click="checkForm(id)">
          <i class="fas fa-check txt-white" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Vue from 'vue';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      id: this.$route.params.id,
      pet: {},
      errors: [],
    };
  },
  mounted() {
    this.getPet(this.id);
    this.getType();
  },
  computed: {
    ...mapState(['petType']),
  },
  methods: {
    ...mapActions(['getType']),
    checkForm(id) {
      this.errors = [];
      console.log(this.pet);
      const data = Object.keys(this.pet).map((key) => [key, this.pet[key]]);
      data.map((e) => {
        if (e[1].length == 0 || (e[0] == 'category' && e[1] == 'category')) {
          this.errors.push(e[0]);
        }
      });
      console.log('errors', this.errors);

      if (this.errors.length == 0) {
        this.editPet(id);
      }
    },
    editPet(id) {
      return axios
        .post(`/api/pet/editPet`, {
          id: this.pet.id,
          firstName: this.pet.firstName,
          lastName: this.pet.lastName,
          birthDate: this.pet.birthDate,
          type: this.pet.type,
          avatarPictureUrl: this.pet.avatarPictureUrl,
          coverPictureUrl: this.pet.coverPictureUrl,
          summary: this.pet.summary,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    getPet(id) {
      return axios
        .get(`/api/pet/${id}`)
        .then((res) => {
          this.pet = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
