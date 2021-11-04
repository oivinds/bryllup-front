import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/es5/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { customProperties: true },
    themes: {
      light: {
        weddingTeal: "#88d8c6", // teal.lighten2
        weddingPink: "#fff1ed", // deepOrange.lighten5
        primary: colors.teal,
        secondary: colors.deepOrange,
        tertiary: colors.pink.accent2,
        accent: colors.grey.darken3,
        background: colors.grey.lighten4,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
});
