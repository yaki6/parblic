<template>
  <v-app>
    <v-main>
      <v-container grid-list-xs>
        <div class="d-flex align-center justify-center mx-6">
          <div class="flex-grow-1">
            <v-sheet height="168"> </v-sheet>
            <v-row justify="center">
              <v-avatar size="120">
                <img :src="avatar" />
              </v-avatar>
            </v-row>
            <v-row justify="center">
              <div class="text-center">
                <p class="text-h6">@{{ userName }}</p>
                <p class="text-subtitle-2">{{ intro }}</p>
              </div>
            </v-row>
            <v-row v-for="(item, i) in links" :key="i">
              <v-btn
                color="primary"
                class="my-2"
                block
                rounded
                x-large
                v-if="item.alive"
                @click="open(item.link)"
              >
                {{ item.title }}
              </v-btn>
            </v-row>
          </div>
        </div>
      </v-container>
    </v-main>
    <div id="footer">
      <v-row justify="center" align="center">
        <v-btn class="primary--text" text to="/">创建你的主页</v-btn>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import db from '@/plugins/leancloud';

export default {
  components: {},
  props: ['userName'],
  metaInfo() {
    return {
      title: `@${this.userName}`,
    };
  },
  name: 'admin',
  data() {
    return {
      user: null,
      links: [],
      urlRules: [(v) => !!v || '请输入链接'],
    };
  },
  computed: {
    avatar() {
      let avatar = 'require("@/assets/logo.png")';
      if (this.user && this.user.avatar) {
        avatar = this.user.avatar;
      }
      return avatar;
    },
    intro() {
      return this.user.intro;
    },
  },
  methods: {
    open(url) {
      let u = url;
      if (!u.match(/^https?:\/\//i)) {
        u = `http://${u}`;
      }
      window.open(u, '_blank');
    },
  },
  async created() {
    const username = this.userName;
    const User = new db.Query('_User');
    User.equalTo('username', username);
    const [user] = await User.find();
    if (!user) {
      this.$router.push({ name: '404' });
    } else {
      this.user = user.toJSON();
      const Links = new db.Query('links');
      Links.equalTo('dependent', user);
      const resp = await Links.find();
      const [l] = resp;
      this.links = l.toJSON().links;
    }
  },
};
</script>

<style scoped>
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
}
</style>
