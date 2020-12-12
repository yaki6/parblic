<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: '一键链接',
      titleTemplate: '%s | POMO',
    };
  },
  name: 'App',
  components: {},

  data: () => ({
    //
  }),
};
</script>
