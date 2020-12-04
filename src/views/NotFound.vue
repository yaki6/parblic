<template>
  <v-app>
    <v-main>
      <v-container>
        <v-sheet height="500">
          <v-row justify="center">
            <v-col justify-center cols="12" md="6" class="text-center">
              <span class="text-h3">Parblic</span>
              <p class="headline">抱歉，是我们跑偏了。</p>
              <v-btn text color="success" to="/">返回首页</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
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
