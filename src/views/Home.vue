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
              只需一个
              <!-- ALERT 请注意在修改此页面时关闭prettier，data-rotate 格式应为 '[ "链接", "二维码"]' 使用双引号会报错 -->
              <span
                class="txt-rotate primary--text"
                data-period="1000"
                data-rotate='[ "链接", "二维码"]'
              ></span>
            </h1>
            <br />
            <h3 class="text-center headline accent--text" style="color: white">
              你的全部内容和商铺，需要一个入口
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
      <v-container grid-list-xs>
        <v-row align="center" class="my-6">
          <v-col cols="12" md="6" align="center">
            <v-img
              width="70%"
              :src="require('@/assets/svg/share_link.svg')"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6" align="center">
            <div class="text-h5">把POMO链接放到所有地方</div>
            <div class="text-h7">
              不管是个人主页，公众号，社交媒体<br />
              在所有地方使用你的POMO链接，让关注者和粉丝发现你最重要的内容
            </div>
          </v-col>
        </v-row>
        <v-row align="center" class="my-6">
          <v-col cols="12" md="6" class="order-md-last" align="center">
            <v-img
              width="70%"
              :src="require('@/assets/svg/social_media.svg')"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6" align="center">
            <div class="text-h5">链接到任何地方</div>
            <div class="text-h7">
              你的视频，文章，网站，店铺
              <br />
              POMO是你线上全部内容的一键入口
            </div>
          </v-col>
        </v-row>
        <v-row align="center" class="my-6">
          <v-col cols="12" md="6" align="center">
            <v-img
              width="70%"
              :src="require('@/assets/svg/note_list.svg')"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6" align="center">
            <div class="text-h5">轻松管理你的链接</div>
            <div class="text-h7">
              几秒内创建你的链接，轻松拖动管理 <br />
              现在就分享你的POMO链接或二维码
            </div>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" align="center">
            <v-btn to="/register" color="primary lighten-1" x-large
              >免费开始</v-btn
            >
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
  methods: {
    animatedHeadline() {
      const TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };

      TxtRotate.prototype.tick = function () {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt} </span>`;

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
          delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum += 1;
          delta = 500;
        }

        setTimeout(() => {
          that.tick();
        }, delta);
      };
      const elements = document.getElementsByClassName('txt-rotate');
      for (let i = 0; i < elements.length; i += 1) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
          // eslint-disable-next-line no-new
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      const css = document.createElement('style');
      css.type = 'text/css';
      css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
      document.body.appendChild(css);
    },
  },
  mounted() {
    this.animatedHeadline();
  },
};
</script>
