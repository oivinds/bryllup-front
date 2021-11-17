<template lang="pug">
	v-card.elevation-0.mb-8( dark rounded :color="cl(inc)")
		v-card-title.text-button.justify-center {{ title }}
			v-btn.ml-4(x-small fab color="white" @click="toggle()" )
				v-icon(dense color="primary" ) {{ showGroup ? 'mdi-eye' : 'mdi-eye-off' }} 
		v-card-text.px-md-8.title {{ description }}
</template>
<script>
export default {
  data() {
    return {
      showGroup: true,
    };
  },
  props: ["title", "description", "inc"],
  methods: {
    toggle() {
      this.showGroup = !this.showGroup;
      this.$emit("update:showToggle", this.inc);
    },
    cl(i) {
      const colors = [
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "lime",
        "amber darken-1",
        "orange darken-1",
      ];
      colors.reverse();
      return colors[i];
    },
  },
};
</script>
