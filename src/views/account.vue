<template>
  <v-card>
    <v-card-text>
      <v-avatar size="150">
        <img src="src" alt="alt" />
      </v-avatar>
      <v-btn color="success">更换头像</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  name: 'admin',
  data() {
    return {};
  },
  computed: {
    parblicLink() {
      return `https://www.parblic.com/${this.userName}`;
    },
  },
  methods: {},
};
</script>
