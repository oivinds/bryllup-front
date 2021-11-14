<template lang="pug">
  v-card.elevation-0.mb-8(rounded color="pink lighten-4")
    v-card-title.text-button.justify-center {{ title}}
    v-card-text.px-md-8.title {{ description }}
</template>
<script>
export default {
  props: ["title", "description"],
};
</script>
