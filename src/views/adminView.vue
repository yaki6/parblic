<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon icon @click="toggle"></v-app-bar-nav-icon>
      <v-toolbar-title to="/">POMO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="logout">退出登录</v-btn>
    </v-app-bar>
    <drawer></drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Drawer from '../components/Drawer.vue';

export default {
  components: { Drawer },
  name: 'adminView',
  metaInfo() {
    return {
      title: '管理中心',
    };
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('base', ['drawer']),
  },
  methods: {
    ...mapMutations('base', ['toggleDrawer']),
    toggle() {
      console.log(!this.drawer);
      this.toggleDrawer(!this.drawer);
    },
    logout() {
      this.$store.dispatch('base/logout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
