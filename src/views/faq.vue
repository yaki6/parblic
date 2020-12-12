<template>
  <v-app>
    <Header></Header>
    <div class="align-center" style="background-color: #dcf1ef; height: 400px">
      <v-container grid-list-xs fill-height fluid>
        <v-row>
          <v-col>
            <h1
              :class="{
                'text-center display-1 accent--text font-weight-bold':
                  $vuetify.breakpoint.smAndDown,
                ' font-weight-bold text-center display-3 accent--text':
                  $vuetify.breakpoint.mdAndUp,
              }"
            >
              F&Q
            </h1>
            <br />
            <h3
              :class="{
                'text-center headline accent--text':
                  $vuetify.breakpoint.smAndDown,
                'text-center display-1 accent--text':
                  $vuetify.breakpoint.mdAndUp,
              }"
              style="color: white"
            >
              常见问题
            </h3>
            <br />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col>
          <div class="container bloc-lg align-center">
            <div class="primary--text">
              <div class="text-h6 mg-md tc-mint mb-4">
                Q: POMO是什么样的网站？
              </div>
            </div>
            <span class="text-subtitle-1 my-4"
              >A:
              POMO是你的一个简单的网站，其中集合了你想要展示给互联网世界的所有内容
            </span>
          </div>
        </v-col>
        <v-col>
          <div class="container bloc-lg align-center">
            <div class="primary--text">
              <div class="text-h6 mg-md tc-mint mb-4">
                Q: 为什么要使用POMO？
              </div>
            </div>
            <span class="text-subtitle-1 my-4"
              >A:
              随着各种各样平台的涌现，你的粉丝和听众需要快速的找到你的最重要的内容。跟踪你的内容和链接</span
            >
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="container bloc-lg align-center">
            <div class="primary--text">
              <div class="text-h6 mg-md tc-mint mb-4">Q: 如何分享POMO链接</div>
            </div>
            <span class="text-subtitle-1 my-4">
              A:
              你可以直接分享用户中心生成的链接，或者保存你的POMO二维码。把它们放到每一处你出现的地方，帮助你吸引流量。
            </span>
          </div>
        </v-col>
        <v-col>
          <div class="container bloc-lg align-center">
            <div class="primary--text">
              <div class="text-h6 mg-md tc-mint mb-4">Q:</div>
            </div>
            <span class="text-subtitle-1 my-4"> A </span>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      menuItems: [
        { title: '文章', path: '/posts', icon: 'mdi-pen' },
        { title: '活动', path: '/events', icon: 'mdi-calendar' },
        { title: '模联会议', path: '/conferences', icon: 'mdi-card-search' },
        {
          title: '模联百科',
          path: 'https://mpedia.munshare.com/',
          icon: 'mdi-lightbulb',
        },
        // {
        //   title: "模时主页",
        //   path: "/user/munID",
        //   icon: "folder_shared",
        // },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['base/isAuthenticated'];
    },
    role() {
      return this.$store.state.base.role;
    },
  },
  methods: {},
};
</script>
