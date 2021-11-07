import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router/index';
Vue.use(Vuex);

export default new Vuex.Store({
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
      state.data = this.state.data.filter(function (
        obj: Record<string, unknown>
      ) {
        return obj.id !== id;
      });
    },
    likePet({ state }, pet) {
      const elem = state.data.find(
        (el: Record<string, unknown>) => el.id == pet.id
      );
      state.likes.push(elem);
      state.data.splice(state.data.indexOf(elem), 1);
    },
    unlikePet({ state }, id) {
      console.log(id);
      const elem = state.likes.find(
        (el: Record<string, unknown>) => el.id == id
      );
      state.data.push(elem);
      state.likes.splice(state.likes.indexOf(elem), 1);
      console.log('likes', state.likes);
    },
  },
});
