<template>
  <v-app-bar app flat color="white">
    <div class="text-h5">Parblic</div>
    <v-spacer></v-spacer>
    <v-btn text class="mr-2" to="/login">登录</v-btn>
    <v-btn color="primary" class="ml-2" to="/register">免费注册</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'appBar',
};
</script>
