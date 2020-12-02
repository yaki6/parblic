<template>
  <v-app>
    <v-app-bar app flat color="white">
      <div class="text-h5">Parblic</div>
      <v-spacer></v-spacer>
      <v-btn text class="mr-2">登录</v-btn>
      <v-btn color="primary" class="ml-2">免费注册</v-btn>
    </v-app-bar>

    <v-main>
      <About></About>
    </v-main>
  </v-app>
</template>

<script>
import About from './views/Home.vue';

export default {
  name: 'App',

  components: {
    About,
  },

  data: () => ({
    //
  }),
};
</script>
