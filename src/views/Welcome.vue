<template>
  <v-app>
    <v-sheet color="#F9F5F1" height="100%">
      <div v-if="alert" class="ma-6">
        <v-snackbar v-model="alert" dismissible top>{{ msg }}</v-snackbar>
      </div>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card elevation="0" align="center" color="#F9F5F1">
              <v-card-title class="justify-center text-h4"
                >欢迎来到POMO</v-card-title
              >
              <div class="justify-center text-subtitle-1">来介绍一下自己</div>
              <v-card-title primary-title></v-card-title>
              <v-card-title primary-title></v-card-title>
              <v-card-title primary-title></v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    outlined
                    v-model="editedInfo.name_zh"
                    label="名字"
                    :rules="requiredRule"
                  ></v-text-field>
                  <v-combobox
                    v-model="industry"
                    :items="industries"
                    label="行业标签"
                    multiple
                    outlined
                    dense
                  ></v-combobox>
                  <v-btn
                    x-large
                    block
                    :disabled="!valid"
                    :loading="loading"
                    color="primary"
                    class="mr-4"
                    @click="admin"
                    >继续</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <img
              src="@/assets/svg/high-five.svg"
              class="img-fluid mx-auto d-block"
              alt="placeholder image"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-app>
</template>
<script>
export default {
  metaInfo: {
    title: '欢迎',
  },
  data() {
    return {
      alert: false,
      msg: '',
      loading: false,
      valid: true,
      industry: [],
      industries: ['电商', '时尚行业', '短视频'],
      requiredRule: [(v) => !!v || '请填写姓名'],
      yearRules: [
        (v) => /^[0-9]{4}$/.test(v) || '请输入合适的日期格式，如2019',
      ],
      editedInfo: {},
    };
  },
  computed: {},
  methods: {
    admin() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('base/updateInfo', this.editedInfo)
          .then(() => {
            this.$router.push('/admin');
          })
          .catch((err) => {
            this.alert = true;
            this.msg = `${err}出错了，请联系我们`;
          });
      }
    },
  },
};
</script>
