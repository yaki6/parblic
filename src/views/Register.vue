<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <div v-if="alert" class="ma-6">
      <v-snackbar v-model="alert" dismissible bottom :color="type">{{
        msg
      }}</v-snackbar>
    </div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card tile align="center">
            <v-card-title class="justify-center">加入Parblic</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="Parblic链接使用的用户名"
                  prepend-inner-icon="mdi-email"
                  required
                ></v-text-field>
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
                <v-text-field
                  v-model="confirmPassword"
                  type="password"
                  :counter="16"
                  :rules="confirmPasswordRules"
                  prepend-inner-icon="mdi-key"
                  label="请确认密码"
                  required
                ></v-text-field>
                <v-row>
                  <v-col>
                    <div>
                      <small>
                        注册即代表同意
                        <a href="/agreement" target="_blank">《用户协议》</a>
                        与
                        <a href="/privacy" target="_blank">《隐私政策》</a>
                      </small>
                    </div>
                  </v-col>
                </v-row>

                <v-btn
                  tile
                  x-large
                  block
                  color="primary"
                  class="mr-4"
                  @click.prevent="register"
                  :loading="loading"
                  :disabled="loading || !valid"
                  >注册</v-btn
                >
                <v-container grid-list-xs>
                  <v-row justify="center">
                    <v-col>
                      <v-btn text color="primary" to="/login"
                        >已经有账号?
                      </v-btn>
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
    title: '注册',
  },
  props: ['userName'],
  data() {
    return {
      type: '',
      valid: true,
      loading: false,
      email: '',
      alert: false,
      msg: null,
      username: '',
      usernameRules: [(v) => !!v || '用户名为必填项'],
      emailRules: [
        (v) => !!v || '邮箱为必填项',
        (v) => /.+@.+\..+/.test(v) || '请输入合法的邮箱',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || '密码是必填项',
        (v) => (v && v.length <= 16) || '密码长度必须不大于16位',
        (v) => (v && v.length >= 6) || '密码必须大于6位',
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        (v) => !!v || '请确认密码',
        (v) => v === this.password || '密码不一致',
      ],
    };
  },
  watch: {
    homepageEmail: {
      immediate: true,
      handler(homepageEmail) {
        this.email = homepageEmail;
      },
    },
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const data = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch('base/register', data)
          .then(() => {
            this.msg = '注册成功，登录中';
            this.alert = true;
            this.type = 'secondary';
            setTimeout(() => {
              this.$store
                .dispatch('base/login', data)
                .then(() => {
                  // this.$router.push('/welcome');
                  this.$router.push('/admin/links');
                })
                .catch((err) => {
                  this.msg = `${err}，请联系我们`;
                  this.alert = true;
                  this.type = 'error';
                });
            }, 500);
          })
          .catch((err) => {
            console.log(err.code);
            if (err.code === 202) {
              this.msg = '用户名已被使用';
              this.alert = true;
              this.type = 'error';
            } else if (err.code === 203) {
              this.msg = '邮箱已经注册，请登录';
              this.alert = true;
              this.type = 'warning';
            } else {
              this.msg = `${err}，请联系我们`;
              this.alert = true;
              this.type = 'error';
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
