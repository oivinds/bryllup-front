<template lang="pug">
	
			//- v-icon.ml-5(dark ) {{ $parent.isActive ? 'mdi-eye-off' : 'mdi-eye' }} 
</template>
<script>
export default {
  data() {
    return {
      showGroup: true,
    };
  },
  props: ["title", "description", "inc"],
  methods: {},
};
</script>
