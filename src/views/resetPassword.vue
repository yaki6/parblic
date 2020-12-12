<template>
  <v-app>
    <v-snackbar top v-model="snackbar" :timeout="4000">
      {{ msg }}
    </v-snackbar>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <div>
            <v-card>
              <v-card-title class="justify-center text-h4"
                >重置你的密码</v-card-title
              >
              <v-card-text>
                <v-text-field
                  name="name"
                  label="输入注册邮箱"
                  v-model="email"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="resetPassword"
                  :loading="submitting"
                  :disabled="submitting"
                  >提交</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import db from '@/plugins/leancloud';

export default {
  data() {
    return {
      email: '',
      snackbar: false,
      msg: '',
      submitting: false,
    };
  },
  computed: {},
  methods: {
    resetPassword() {
      this.submitting = true;
      db.User.requestPasswordReset(this.email)
        .then(() => {
          this.snackbar = true;
          this.msg = '请查看邮箱重置密码';
          this.$router.push('/login');
        })
        .catch((e) => {
          this.snackbar = true;
          this.msg = e;
        })
        .finally(() => {
          this.submitting = false;
        });
    },
  },
};
</script>
