<template>
  <v-app>
    <v-main>
      <v-container>
        <v-sheet height="300"> </v-sheet>
        <v-row justify="center">
          <v-col justify-center cols="12" md="6" class="text-center">
            <p class="text-h3 purple--text">POMO</p>
            <p class="headline mt-12">抱歉，没有找到你想要的</p>
            <v-btn text color="primary" to="/">返回首页</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'notFound',
  metaInfo: {
    title: '跑偏了',
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
