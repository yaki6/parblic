<template>
  <v-app>
    <v-app-bar app clipped-left flat>
      <v-app-bar-nav-icon icon @click="toggle"></v-app-bar-nav-icon>
      <v-toolbar-title to="/">Parblic</v-toolbar-title>
      <v-spacer></v-spacer>
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
  data() {
    return {};
  },
  computed: {
    ...mapState('base', ['drawer']),
    parblicLink() {
      return `https://www.parblic.com/${this.userName}`;
    },
  },
  methods: {
    ...mapMutations('base', ['toggleDrawer']),
    toggle() {
      console.log(!this.drawer);
      this.toggleDrawer(!this.drawer);
    },
  },
};
</script>
