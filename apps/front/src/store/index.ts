import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router/index';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    isLoading: false,
    petType: [],
  },
  actions: {
    getAll({ state }) {
      this.state.isLoading = true;
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
      this.state.isLoading = true;
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
      this.state.isLoading = true;
      return Vue.axios
        .post('/api/pet/new', {
          pet,
        })
        .then((res) => {
          console.log('ok', res);
        })
        .catch((err) => {
          console.error(err.toJSON());
        })
        .finally(() => {
          this.state.isLoading = false;
        });
    },
    delPet({ state }, id) {
      this.state.data = this.state.data.filter(function (obj: any) {
        return obj.id !== id;
      });
    },
  },
});
