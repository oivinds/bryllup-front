<template lang="pug">
v-app#app
  v-main
    router-view

</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" scoped>
#app {
  background-color: var(--v-background-base);
}
</style>
