// import db from '@/plugins/leancloud';

export default {
  namespaced: true,
  state: {
    links: [
      {
        name: '知乎',
        link: '',
      },
    ],
  },
  mutations: {
    set_user(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    isAuthenticated: (state) => {
      let flag = null;
      if (state.user) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    },
  },
  actions: {},
};
