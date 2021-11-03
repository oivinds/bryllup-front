<template lang="pug">
v-row
  v-col(cols="12" md="6")
    v-card-title.headline {{ title}}
  v-col(cols="12" md="6")
    v-card-title.title Velkommen {{ name }} 	

</template>
<script>
export default {
  props: ["title", "name"],
};
</script>
