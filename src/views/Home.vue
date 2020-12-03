<template>
  <div>
    <app-bar></app-bar>
    <div class="align-center" style="height: 500px">
      <v-container grid-list-xs fill-height fluid>
        <v-row>
          <v-col>
            <h1
              :class="{
                'text-center display-1 accent--text':
                  $vuetify.breakpoint.smAndDown,
                '  text-center display-2 accent--text':
                  $vuetify.breakpoint.mdAndUp,
              }"
            >
              只需一个二维码
            </h1>
            <br />
            <h3 class="text-center headline accent--text" style="color: white">
              你的全部社交账号入口，只需一个二维码
            </h3>
            <br />
            <v-row class="justify-center align-center">
              <v-col cols="6" md="1" align="center">
                <v-btn to="/register" color="primary lighten-1" x-large
                  >免费开始</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import appBar from '../components/appBar.vue';

export default {
  name: 'about',
  components: {
    appBar,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
