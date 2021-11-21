<template lang="pug">
	v-card.elevation-3(ripple dark rounded :color="cl(inc)")
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
    cl(i) {
      const colors = [
        "purple darken-1",
        "deep-purple darken-1",
        "indigo darken-1",
        "blue darken-1",
        "cyan darken-1",
        "teal darken-1",
        "green darken-1",
        "light-green darken-1",
        "lime darken-1",
        "amber darken-1",
        "orange darken-1",
      ];

      colors.reverse();
      return colors[i];
    },
  },
};
</script>
