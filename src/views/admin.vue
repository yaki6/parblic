<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Parblic</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container grid-list-xs>
        <v-row>
          <v-btn color="primary" block>新链接</v-btn>
        </v-row>
        <v-row justify="center" class="mt-4">
          <v-card width="500" class="ma-4">
            <v-card-text>
              <v-text-field
                dense
                prepend-icon="mdi-pencil"
                label="输入标题"
                v-model="title"
              ></v-text-field>
              <v-text-field
                dense
                prepend-icon="mdi-link-plus"
                label="输入链接"
                hint="http://url"
                v-model="link"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-switch v-model="alive"></v-switch>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      urlRules: [(v) => !!v || '请输入链接'],
    };
  },
  computed: {},
  methods: {},
};
</script>
