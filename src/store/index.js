import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// Store functionality
// import modules from "./modules"; // equivalent to "./modules/index.js"
import base from './modules/base';
import link from './modules/link';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    base,
    link,
  },
  plugins: [
    createPersistedState({
      paths: ['base'],
    }),
  ],
});

export default store;
