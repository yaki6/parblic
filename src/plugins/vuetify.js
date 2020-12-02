import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#8E24AA',
        secondary: '#424242',
        accent: '#2B283E',
        error: '#FF5252',
        info: '#2196F3',
        success: '#398961',
        warning: '#FFC107',
      },
      dark: {
        primary: '#398961',
        secondary: '#757575',
        accent: '#2B283E',
        error: '#E53935',
        info: '#2196F3',
        success: '#43A047',
        warning: '#FDD835',
      },
    },
  },
});
