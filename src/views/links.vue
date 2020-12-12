<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="1500" bottom :color="color">
      {{ msg }}
    </v-snackbar>
    <v-container grid-list-xs>
      <v-dialog v-model="qrDialog" width="500">
        <v-card>
          <v-card-title class="justify-center"> POMO </v-card-title>

          <v-card-text class="text-center">
            {{ pomoLink }}
            <br />
            <vue-qrcode :value="pomoLink" :width="300" :scale="5" :margin="2" />
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="download"> 下载图片 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="4" class="order-md-first">
          我的POMO:
          <a :href="pomoLink" target="_blank">
            {{ pomoLink }}
          </a>
          <v-menu right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary" block>
                分享
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="copy"
                  >复制我的POMO URL</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="qrDialog = true"
                  >下载我的POMO二维码</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
          <br />
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col>
              <v-btn color="secondary" @click="save" block> 保存 </v-btn>
            </v-col>
            <v-col>
              <v-btn color="secondary" block @click="add">新链接</v-btn>
            </v-col>
          </v-row>

          <draggable
            :list="links"
            handle=".handle"
            @start="drag = true"
            @end="drag = false"
          >
            <template v-for="(item, i) in links">
              <v-card class="my-4" :key="i" height="180">
                <v-card-text>
                  <v-row>
                    <v-col cols="1">
                      <v-icon class="handle">mdi-menu</v-icon>
                    </v-col>
                    <v-col cols="11">
                      <v-text-field
                        dense
                        prepend-icon="mdi-pencil"
                        label="输入标题"
                        v-model="item.title"
                      ></v-text-field>
                      <v-text-field
                        dense
                        prepend-icon="mdi-link-plus"
                        label="输入链接"
                        hint="http://url"
                        v-model="item.link"
                      ></v-text-field>
                      <div class="d-flex justify-end align-center">
                        <span v-if="item.alive"> 展示链接 </span>
                        <span v-else> 隐藏链接 </span>
                        <v-switch
                          class="ml-1"
                          inset
                          dense
                          v-model="item.alive"
                          color="success"
                        ></v-switch>
                        <v-btn @click="removeAt(i)" icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </draggable>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import VueQrcode from 'vue-qrcode';
// import debounce from 'lodash/debounce';
import db from '@/plugins/leancloud';

export default {
  components: {
    draggable,
    VueQrcode,
  },
  name: 'admin',
  data() {
    return {
      drag: false,
      color: 'secondary',
      updating: false,
      snackbar: false,
      msg: '',
      qrDialog: false,
      links: [
        {
          title: '',
          link: '',
          alive: false,
        },
      ],
      urlRules: [(v) => !!v || '请输入链接'],
    };
  },
  computed: {
    userName() {
      const user = JSON.parse(JSON.stringify(this.$store.state.base.user));
      return user.username;
    },
    pomoLink() {
      const url = window.location.href;
      // const url = 'https://parblic.munshare.com';
      const host = url.match(/^.+?[^/:](?=[?/]|$)/)[0];
      return `${host}/${this.userName}`;
    },
  },
  methods: {
    add() {
      this.links.unshift({ title: ' ', link: '', alive: true });
    },
    removeAt(idx) {
      this.links.splice(idx, 1);
    },
    save() {
      this.linkObj
        .set('links', this.links)
        .save()
        .then(() => {
          this.snackbar = true;
          this.msg = '保存成功';
          this.color = 'primary';
        })
        .catch((e) => {
          this.snackbar = true;
          this.msg = `${e}请联系我们`;
          this.color = 'error';
        });
    },
    copy() {
      const textArea = document.createElement('textarea');
      textArea.value = this.pomoLink;
      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.msg = '复制成功';
          this.snackbar = true;
        }
      } catch (err) {
        this.msg = err;
        this.snackbar = true;
      }
      document.body.removeChild(textArea);
    },
    download() {
      const imageSrc = document.getElementsByTagName('img')[0].currentSrc;
      // const image = new Image();
      // image.src = imageSrc;
      const anchor = document.createElement('a');
      anchor.href = imageSrc;
      anchor.target = '_blank';
      anchor.download = 'parblic.png';
      anchor.click();
    },
  },
  created() {
    const links = new db.Query('links');
    links
      .equalTo('dependent', db.User.current())
      .find()
      .then((resp) => {
        if (resp.length === 0) {
          const L = db.Object.extend('links');
          const l = new L();
          l.set('dependent', db.User.current());
          const link = [
            {
              title: '',
              link: 'http://url',
              alive: false,
            },
          ];
          this.links = link;
          l.set('links', link);
          l.save().then((r) => console.log(r));
        } else {
          const [linkObj] = resp;
          this.linkObj = linkObj;
          this.links = linkObj.toJSON().links;
        }
      });
  },
};
</script>
