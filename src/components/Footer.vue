<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile color="grey darken-3">
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="grey darken-3">
              关注我们
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn class="mx-4" dark icon v-on="on">
                    <v-icon size="35px" color="primary">mdi-wechat</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title
                    >关注我们</v-card-title
                  >

                  <v-card-text>
                    扫码关注模时微信公众号，欢迎来撩。感谢对模联的热爱与对模时的关注！
                    <br />
                    <img src="../../assets/img/wechatPublic.jpg" />
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
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="9">
            <v-row>
              <v-col cols="6" md="3">
                <v-list color="grey darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">关于模时</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/p/5eba06e8086e1f00088d8c8b"
                      >模时介绍</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/conferenceManagement"
                      >会务管理</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/faq">常见问题</v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6" md="3">
                <v-list color="grey darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">模时社群</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text href="https://mpedia.munshare.com"
                      >模联百科</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/university"
                      >高校模联U+</v-btn
                    >
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6" md="3">
                <v-list color="grey darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">联系我们</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/contact">举报投诉</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text href="mailto:hello@munshare.com"
                      >合作洽谈</v-btn
                    >
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6" md="3">
                <v-list color="grey darken-3">
                  <v-list-item>
                    <v-btn text disabled class="title">法律信息</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/agreement">用户协议</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="white" text to="/privacy">隐私政策</v-btn>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-img
              :src="require('../../assets/img/munshare-main-tp.png')"
              contain
              aspect-ratio="2"
            ></v-img>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-text class="py-1 grey--text">
          2018-{{ new Date().getFullYear() }} ©MUNSHARE模时
          <a href="http://beian.miit.gov.cn/">陕ICP备20005714号</a>
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
      {
        name: 'mdi-qqchat',
        url: '/contact',
      },
      {
        name: 'mdi-linkedin',
        url: 'https://www.linkedin.com/company/munshare/',
      },
      {
        name: 'mdi-email-outline',
        url: ' mailto:hello@munshare.com',
      },
    ],
  }),
};
</script>
