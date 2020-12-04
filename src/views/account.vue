<template>
  <v-card>
    <v-snackbar v-model="snackbar" bottom :timeout="2000">
      {{ msg }}
    </v-snackbar>
    <v-card-text>
      <v-row class="d-flex justify-start">
        <v-col class="12" md="2">
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
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  name: 'account',
  data() {
    return {
      snackbar: false,
      msg: '',
      avatar: '',
      selectedAvatar: null,
      avatarUploading: false,
      avatarRules: [
        (v) => (v && v.size < 1000000) || '请上传少于1MB的头像图片',
      ],
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
    parblicLink() {
      return `https://www.parblic.com/${this.userName}`;
    },
    userName() {
      return this.$store.state.base.user.username;
    },
    email() {
      return this.$store.state.base.user.email;
    },
  },
  methods: {
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
          this.loadingAvatar = false;
          this.snackbar = true;
          this.msg = `${err}请联系我们`;
        });
    },
  },
  created() {
    const { avatar } = this.$store.state.base.user;
    if (avatar) {
      this.avatar = avatar;
    }
  },
};
</script>
