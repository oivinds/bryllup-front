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
				primary: colors.teal.accent4,
				secondary: colors.deepOrange,
				tertiary: colors.pink,
				accent: colors.grey.darken3,
				background: colors.grey.lighten4,
				frame: "#ffffff",
				info: colors.teal.lighten1,
				warning: colors.amber.base,
				error: colors.deepOrange.accent4,
				success: colors.green.accent3,
				// farge1: obj.#FF9AA2,
				// farge2: obj.#FFB7B2,
				// farge3: obj.#FFDAC1,
				// farge4: obj.#E2F0CB,
				// farge5: obj.#B5EAD7,
				// farge6: obj.#C7CEEA,
			},
		},
	},
});
