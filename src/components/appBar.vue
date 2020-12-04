<template>
  <v-app-bar app flat color="white">
    <div class="text-h5">Parblic</div>
    <v-spacer></v-spacer>
    <div v-if="isLoggedin">
      <v-btn color="primary" to="/admin">
        <v-icon>mdi-account</v-icon>
        管理面板</v-btn
      >
    </div>
    <div v-else>
      <v-btn text class="mr-2" to="/login">登录</v-btn>
      <v-btn color="primary" class="ml-2" to="/register">免费注册</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'appBar',
  computed: {
    isLoggedin() {
      return this.$store.getters['base/isAuthenticated'];
    },
  },
};
</script>
