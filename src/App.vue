<template lang="pug">
v-app#app
  v-container
    v-card.pa-4(dark color="tertiary")
      v-row
        v-col(align-self="center")
          v-card-actions.justify-center 
            v-card-title.title.text-md-h6.text-lg-h5 Bryllupsplanleggeren
        v-col(align-self="center")
          v-card-actions.justify-center(:key="timeBeforeWedding") 
            v-card-title.title {{ name }}'s liste 
        v-col(align-self="center")
          v-card-actions.justify-center 
            v-tab(to='/' color="primary" )
              v-icon mdi-account
            v-tab(to='/todo' color="primary" )
              v-icon mdi-calendar-check
  router-view
  
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: { ...mapState(["name", "editBool", "timeBeforeWedding"]) },
};
</script>
<style lang="scss">
#app {
  background-color: var(--v-background-darken2);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>
