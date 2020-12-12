<template>
  <v-footer padless>
    <v-card class="flex" flat tile>
      <v-container>
        <v-row>
          <v-col>
            <!-- <v-card-title class="darken-3">
              关注我们
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn class="mx-4" dark icon v-on="on">
                    <v-icon size="35px" color="primary">mdi-wechat</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline lighten-2" primary-title
                    >关注我们</v-card-title
                  >
                  <v-card-text>
                    扫码关注微信公众号，欢迎来撩。
                    <br />
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                v-for="icon in icons"
                :key="icon.name"
                class="mx-4"
                dark
                icon
                :href="icon.url"
              >
                <v-icon size="35px" color="primary">{{ icon.name }}</v-icon>
              </v-btn>
            </v-card-title> -->
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="9">
            <v-row>
              <v-col cols="6" md="3">
                <v-list color=" darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">关于模时</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text to="/intro">POMO介绍</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text to="/faq">常见问题</v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6" md="3">
                <v-list color=" darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">POMO社群</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text to="/regulation">POMO规范</v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6" md="3">
                <v-list color=" darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">联系我们</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text to="/contact">举报投诉</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text href="/contact">合作洽谈</v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6" md="3">
                <v-list color=" darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">法律信息</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text to="/agreement">用户协议</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text to="/privacy">隐私政策</v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-img contain aspect-ratio="2"></v-img>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-text class="py-1 --text">
          {{ new Date().getFullYear() }} ©POMO
          <!-- <a href="http://beian.miit.gov.cn/">陕ICP备20005714号</a> -->
        </v-card-text>
      </v-container>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    dialog: false,
    dialog1: false,
    icons: [
      // {
      //   name: 'mdi-linkedin',
      //   url: 'https://www.linkedin.com/company/munshare/',
      // },
    ],
  }),
};
</script>
