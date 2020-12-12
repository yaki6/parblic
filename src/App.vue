<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
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
