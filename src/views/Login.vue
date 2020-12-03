<template>
  <v-app>
    <div v-if="alert" class="ma-6">
      <v-snackbar v-model="alert" top :color="type">{{ msg }}</v-snackbar>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card tile align="center">
            <v-card-title class="justify-center">欢迎回来</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="请输入邮箱"
                  prepend-inner-icon="mdi-email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  type="password"
                  :counter="16"
                  :rules="passwordRules"
                  prepend-inner-icon="mdi-lock"
                  label="请输入密码"
                  required
                ></v-text-field>

                <v-row justify="space-between">
                  <v-btn text color="primary" to="/resetpassword"
                    >忘记密码？</v-btn
                  >
                </v-row>
                <v-btn
                  x-large
                  block
                  :disabled="!valid"
                  :loading="loading"
                  color="primary"
                  class="mr-4"
                  @click="login"
                  >登录</v-btn
                >
                <v-container>
                  <v-row justify="center">
                    <v-col>
                      <v-btn text color="primary" to="/register"
                        >没有账号?</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  metaInfo: {
    title: '登录',
  },
  data() {
    return {
      alert: false,
      type: 'success',
      msg: '',
      loading: false,
      valid: true,
      rememberMe: false,
      email: '',
      emailRules: [
        (v) => !!v || '邮箱为必填项',
        (v) => /.+@.+\..+/.test(v) || '请输入合法的邮箱',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || '密码是必填项',
        (v) => (v && v.length <= 16) || '密码长度必须不大于16位',
      ],
    };
  },
  computed: {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        const data = {
          email: this.email,
          password: this.password,
        };
        this.loading = true;
        this.$store
          .dispatch('base/userLogin', data)
          .then(() => {
            this.loading = false;
            if (this.$store.state.base.role === 'user') {
              this.$router.push('/user/dashboard');
            } else {
              this.alert = true;
              this.msg = '您注册的账户为组织账户，正在登录组织页面';
              setTimeout(() => {
                this.$router.push('/org/dashboard');
              }, 5000);
            }
          })
          .catch((err) => {
            this.loading = false;
            if (err.code === 211) {
              this.msg = '您尚未注册，请注册后登录';
              this.alert = true;
              this.type = 'warning';
            } else if (err.code === 210) {
              this.msg = '用户名和密码不匹配,请重试';
              this.alert = true;
              this.type = 'warning';
            } else {
              this.msg = `${err}，请联系我们`;
              this.alert = true;
              this.type = 'error';
            }
          });
      }
    },
  },
};
</script>
