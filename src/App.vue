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
  v-footer.elevation-10(fixed :padless="true" app color="white")
    v-row
      v-col(align-self="center")
        v-card-actions.justify-center 
          .body-1 {{ todosDone }} av  {{ todos.length }} oppgaver fullført
      v-col(align-self="center")
        transition(name="fade" mode="out-in" appear)
          v-card-actions.justify-center(:key="timeBeforeWedding") 
            .body-1(v-if="timeBeforeWedding") {{ timeBeforeWedding }} til bryllupet
            .body-1(v-else) sett bryllupsdato!
      v-col(align-self="center")
        v-card-actions.justify-center 
          NewModal
      v-col(align-self="center")
        v-card-actions.justify-center 
          DatePicker

</template>

<script>
import { mapState, mapGetters } from "vuex";
import DatePicker from "@/components/DatePicker";
import NewModal from "@/components/NewModal";

export default {
  name: "App",
  components: { DatePicker, NewModal },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["name", "editBool", "timeBeforeWedding"]),
    ...mapGetters(["todosDone", "todos"]),
  },
};
</script>
<style lang="scss">
#app {
  background-color: var(--v-background-lighten4);
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
