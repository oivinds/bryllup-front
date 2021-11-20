<template lang="pug">
	v-card.elevation-3(dark rounded :color="cl(inc)")
		v-card-title.text-button.justify-center {{ title }}
			v-icon.ml-5(dark ) {{ $parent.isActive ? 'mdi-eye-off' : 'mdi-eye' }} 
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
