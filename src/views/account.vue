<template>
  <v-card>
    <v-card-text>
      <v-card-text class="mb-0 pb-1">
        {{ avatar }}
        <v-avatar v-if="avatar != ''" size="130">
          <v-img :src="avatar" class="align-center"></v-img>
        </v-avatar>
        <v-avatar v-else size="130">
          <v-img
            src="https://file.munshare.com/468c1828a0c637b75153.png/lingyanglogo.png"
            class="align-end"
          ></v-img>
        </v-avatar>
      </v-card-text>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  name: 'admin',
  data() {
    return {
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
      fileReader.addEventListener('load', () => {
        this.avatar = fileReader.result; // 生成图片的base64 格式以预览
      });
      fileReader.readAsDataURL(file);
    },
  },
  computed: {
    avatar: {
      get() {
        return (
          this.$store.state.base.user && this.$store.state.base.user.avatar
        );
      },
      // set(val) {
      //   this.avatar = val;
      // },
    },
    parblicLink() {
      return `https://www.parblic.com/${this.userName}`;
    },
  },
  methods: {
    onUploadAvatar() {
      this.avatarUploading = true;
      const image = this.selectedAvatar;
      this.$store
        .dispatch('base/updateAvatar', image)
        .then(() => {
          console.log(image);
          this.avatarUploading = false;
          this.$store.dispatch('base/fetchBasicInfo');
          this.alert = true;
          this.msg = '头像更新成功';
          this.$store.dispatch('base/fetchBasicInfo');
        })
        .catch((err) => {
          this.loadingAvatar = false;
          this.alert = true;
          this.msg = `${err}请联系我们`;
        });
    },
  },
};
</script>
