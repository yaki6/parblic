<template>
  <v-container grid-list-xs>
    <v-card>
      <v-snackbar v-model="snackbar" bottom :timeout="2000">
        {{ msg }}
      </v-snackbar>
      <v-card-text>
        <v-row class="d-flex justify-start">
          <v-col class="12" md="2" cols="12">
            <v-avatar v-if="avatar != ''" size="130">
              <v-img :src="avatar" class="align-center"></v-img>
            </v-avatar>
            <v-avatar v-else size="130">
              <v-img
                src="https://file.munshare.com/468c1828a0c637b75153.png/lingyanglogo.png"
                class="align-end"
              ></v-img>
            </v-avatar>
            <v-file-input
              class="ml-13 pt-0 mt-0"
              v-model="selectedAvatar"
              prepend-icon="mdi-camera"
              accept="image/*"
              hide-input
              :rules="avatarRules"
            ></v-file-input>
            <v-btn
              small
              color="primary"
              class="pa-1 ml-8"
              :loading="avatarUploading"
              @click="onUploadAvatar()"
              >保存头像</v-btn
            >
          </v-col>
          <v-col class="12" md="10">
            <p>用户名: {{ userName }}</p>
            <p>邮箱: {{ email }}</p>
            <v-form v-model="valid" ref="form">
              <div>
                <v-textarea
                  outlined
                  dense
                  label="介绍"
                  v-model="intro"
                  rows="2"
                  hint="在这里简单介绍下你的品牌"
                  :rules="limitRule"
                ></v-textarea>
              </div>
              <v-btn
                color="primary"
                @click="saveIntro"
                :loading="loadingIntro"
                :disabled="loadingIntro || !valid"
                >保存</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import db from '@/plugins/leancloud';

export default {
  components: {},
  name: 'account',
  data() {
    return {
      valid: true,
      snackbar: false,
      msg: '',
      avatar: '',
      intro: '',
      selectedAvatar: null,
      avatarUploading: false,
      loadingIntro: false,
      avatarRules: [
        (v) => (v && v.size < 1000000) || '请上传少于1MB的头像图片',
      ],
      limitRule: [(v) => v.length < 30 || '请输入少于30字'],
    };
  },
  watch: {
    selectedAvatar() {
      const file = this.selectedAvatar;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        this.avatar = fileReader.result; // 生成图片的base64 格式以预览
      });
    },
  },
  computed: {
    userName() {
      const user = JSON.parse(JSON.stringify(this.$store.state.base.user));
      return user.username;
    },
    email() {
      const user = JSON.parse(JSON.stringify(this.$store.state.base.user));
      return user.email;
    },
  },
  methods: {
    saveIntro() {
      this.loadingIntro = true;
      if (this.$refs.form.validate()) {
        const user = db.User.current();
        user
          .set('intro', this.intro)
          .save()
          .then(() => {
            this.msg = '保存成功';
            this.snackbar = true;
          })
          .catch((e) => {
            this.msg = e;
            this.snackbar = true;
          })
          .finally(() => {
            this.loadingIntro = false;
          });
      }
    },
    onUploadAvatar() {
      this.avatarUploading = true;
      const image = this.selectedAvatar;
      this.$store
        .dispatch('base/updateAvatar', image)
        .then(() => {
          this.avatarUploading = false;
          this.$store.dispatch('base/updateuser');
          this.snackbar = true;
          this.msg = '头像更新成功';
        })
        .catch((err) => {
          this.avatarUploading = false;
          this.snackbar = true;
          this.msg = `${err}请联系我们`;
        });
    },
  },
  created() {
    const user = JSON.parse(JSON.stringify(this.$store.state.base.user));
    if (user) {
      this.avatar = user.avatar;
      this.intro = user.intro;
    }
  },
};
</script>
