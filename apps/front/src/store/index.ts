import Vue from 'vue';
import Vuex from 'vuex';
import { IAnimal } from '@tinderpet/user';

// import router from '../router/index';
Vue.use(Vuex);
import axios from 'axios';
import router from '../router';

export interface State {
  data: Array<IAnimal>;
  isLoading: boolean;
  petType: Array<string>;
  likes: Array<IAnimal>;
}

export default new Vuex.Store<State>({
  state: {
    data: [],
    isLoading: false,
    petType: [],
    likes: [],
  },
  actions: {
    getAll({ state }) {
      state.isLoading = true;
      return Vue.axios
        .get('/api/pet')
        .then((res) => {
          this.state.data = res.data;
        })
        .catch((err) => {
          console.error(err.toJSON());
        })
        .finally(() => {
          this.state.isLoading = false;
        });
    },
    edit({ state }, pet) {
      return axios
        .post(`/api/pet/editPet`, pet)
        .then((res) => {
          const item: number = state.data.findIndex(
            (el) => el.id == res.data.id
          );
          state.data[item] = pet;
          router.push('/pets');
        })
        .catch((err) => console.log(err));
    },
    getType({ state }) {
      state.isLoading = true;
      return Vue.axios
        .get('/api/pet/pet-types')
        .then((res) => {
          if (res.status === 200) {
            this.state.petType = res.data;
          } else {
            console.error(res);
          }
        })
        .catch((err) => {
          console.error(err.toJSON());
        })
        .finally(() => {
          this.state.isLoading = false;
        });
    },
    insertNewPet({ state }, pet) {
      state.isLoading = true;
      return Vue.axios
        .post('/api/pet/new', {
          pet,
        })
        .then((res) => {
          state.data.push(res.data);
        })
        .catch((err) => {
          console.error(err.toJSON());
        })
        .finally(() => {
          this.state.isLoading = false;
        });
    },
    delPet({ state }, id) {
      state.data = this.state.data.filter((obj) => {
        return obj.id !== id;
      });
    },
    likePet({ state }, pet) {
      const elemId = state.data.findIndex((el) => el.id == pet.id);
      const elem = state.data[elemId];
      state.likes.push(elem);
      state.data.splice(state.data.indexOf(elem), 1);
    },
    unlikePet({ state }, id) {
      console.log(id);
      const elemId = state.likes.findIndex((el) => el.id == id);
      const elem = state.likes[elemId];
      state.data.push(elem);
      state.likes.splice(state.likes.indexOf(elem), 1);
      console.log('likes', state.likes);
    },
  },
});
