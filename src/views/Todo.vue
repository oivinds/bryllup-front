<template lang="pug">
div
	v-container
				
		List
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
</template>

<script>
import { mapState, mapGetters } from "vuex";

import NewModal from "../components/NewModal";
import List from "../components/List";

export default {
  name: "Todo",
  components: {
    List,
    NewModal,
  },
  computed: {
    ...mapState(["name", "editBool", "timeBeforeWedding"]),
    ...mapGetters(["todos", "todosDone"]),
    bigTitle() {
      let classString = "";
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          classString = "title";
          break;
        case "sm":
          classString = "headline";
          break;
        case "md":
          classString = "display-1";
          break;
        case "lg":
          classString = "display-1";
          break;
        case "xl":
          classString = "display-3";
          break;
      }
      return classString;
    },
  },
};
</script>
