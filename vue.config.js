module.exports = {
	transpileDependencies: ["vuetify"],
	publicPath: process.env.NODE_ENV === "production" ? "/bryllup-front/" : "/",
	pluginOptions: {
		moment: {
			locales: ["nb"],
		},
	},
};
