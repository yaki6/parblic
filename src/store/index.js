import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// Store functionality
// import modules from "./modules"; // equivalent to "./modules/index.js"
import base from './modules/base';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    base,
  },
  plugins: [
    createPersistedState({
      paths: ['base'],
    }),
  ],
});

export default store;
