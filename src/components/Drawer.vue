<template>
  <v-navigation-drawer app v-model="drawerState">
    <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item
          dense
          v-for="(a_link, i) in a_links"
          :key="i"
          :to="a_link.to"
        >
          <v-list-item-icon class="mx-0">
            <v-icon small>{{ a_link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="a_link.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <div class="mx-3">
        <p class="caption grey--text lighten-3">© 2020 Parblic</p>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data: () => ({
    a_links: [
      {
        to: '/admin/links',
        icon: 'mdi-link-plus',
        text: '管理链接',
      },
      {
        to: '/admin/account',
        icon: 'mdi-account',
        text: '我的账号',
      },
    ],
    responsive: false,
  }),
  computed: {
    ...mapState('base', ['drawer']),
    drawerState: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.toggleDrawer(val);
      },
    },
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener('resize', this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations('base', ['toggleDrawer']), // 引入namespaced module mutations
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
  },
};
</script>
