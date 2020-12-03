import db from '@/plugins/leancloud';

export default {
  namespaced: true,
  state: {
    userId: '',
    msg: '',
    user: null,
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
  actions: {
    async login({ commit }, payload) {
      try {
        const login = await db.User.logIn(payload.email, payload.password);
        commit('set_user', db.User.current());
        return login;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const user = new db.User();
        user.setUsername(payload.email);
        user.setEmail(payload.email);
        user.setPassword(payload.password);
        user
          .signUp()
          .then((resp) => {
            commit('set_role', 'user');
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        db.User.logOut()
          .then((resp) => resolve(resp))
          .catch((err) => reject(err));
        commit('set_user', null);
      });
    },
  },
};
