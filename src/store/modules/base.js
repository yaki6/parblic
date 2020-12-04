import db from '@/plugins/leancloud';

export default {
  namespaced: true,
  state: {
    msg: '',
    user: null,
    drawer: true,
  },
  mutations: {
    set_user(state, payload) {
      state.user = payload;
    },
    toggleDrawer(state, payload) {
      state.drawer = payload;
    },
    placeholder() {},
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
        user.setEmail(payload.email);
        user.setPassword(payload.password);
        user
          .signUp()
          .then((resp) => {
            commit('placeholder');
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
    updateUser({ state, commit }) {
      return new Promise(() => {
        state.user.fetch().then((resp) => {
          commit('setInfo', resp);
        });
      });
    },
    async updateAvatar({ commit }, payload) {
      const avatar = new db.File('user_avatar', payload);
      const file = await avatar.save();
      if (file) {
        const url = file.get('url');
        const user = db.User.current();
        const oldUrl = user.get('avatar');
        try {
          await user.set('avatar', url).save();
          const query = new db.Query('_File');
          console.log(oldUrl);
          const oldFile = await query.equalTo('url', oldUrl).find();
          console.log(oldFile);
          await oldFile[0].destroy();
          commit('SET_status', true);
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
