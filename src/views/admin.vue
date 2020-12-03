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
          <v-btn color="primary" block @click="add">新链接</v-btn>
        </v-row>
        {{ links }}
        <v-row justify="center" class="mt-4">
          <draggable tag="v-layout" v-model="links">
            <template v-for="(item, i) in links">
              <v-card width="500" class="ma-4" :key="i">
                <v-card-text>
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
                  <v-switch inset dense v-model="item.alive"></v-switch>
                  <v-btn color="warning" @click="removeAt(i)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </template>
          </draggable>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable';
// import linkCard from '../components/linkCard';

export default {
  components: {
    draggable,
    // linkCard,
  },
  name: 'admin',
  data() {
    return {
      links: [
        {
          title: '知乎',
          link: 'fasdfa',
          alive: true,
        },
        {
          title: 'baidu',
          link: 'asdf',
          alive: false,
        },
      ],
      urlRules: [(v) => !!v || '请输入链接'],
    };
  },
  computed: {},
  methods: {
    add() {
      this.links.push({ title: ' ', link: '' });
    },
    removeAt(idx) {
      this.links.splice(idx, 1);
    },
  },
};
</script>
