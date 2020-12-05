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
              你的全部社交账号，只需一个入口
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
