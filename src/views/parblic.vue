<template>
  <v-app>
    <v-main>
      <v-container grid-list-xs>
        <div class="d-flex align-center justify-center mx-6">
          <div class="flex-grow-1">
            <v-sheet height="168"> </v-sheet>
            <v-row justify="center">
              <v-avatar size="120">
                <img
                  src="https://file.munshare.com/468c1828a0c637b75153.png/lingyanglogo.png"
                />
              </v-avatar>
            </v-row>
            <v-row justify="center">
              <p class="text-h6">@{{ userName }}</p>
            </v-row>
            <v-row v-for="(item, i) in links" :key="i">
              <v-btn
                color="primary"
                class="my-2"
                block
                rounded
                x-large
                @click="open(item.link)"
              >
                {{ item.title }}
              </v-btn>
            </v-row>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import appBar from '../components/appBar.vue';

export default {
  components: {
    // appBar,
  },
  props: ['userName'],
  name: 'admin',
  data() {
    return {
      links: [
        {
          title: '知乎',
          link: 'www.zhihu.com',
          alive: true,
        },
        {
          title: 'baidu',
          link: 'https://baidu.com',
          alive: false,
        },
      ],
      urlRules: [(v) => !!v || '请输入链接'],
    };
  },
  computed: {
    parblicLink() {
      return `https://www.parblic.com/${this.userName}`;
    },
  },
  methods: {
    open(url) {
      console.log(url);
      let u = url;
      if (!u.match(/^https?:\/\//i)) {
        u = `http://${u}`;
      }
      window.open(u, '_blank');
    },
  },
};
</script>

<style scoped>
</style>
