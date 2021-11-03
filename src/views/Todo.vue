<template lang="pug">
div
	v-container
		p {{ $vuetify.breakpoint.name}}
		v-card(color="grey darken-3" dark)
			v-row.pa-4(d-flex justify="center" justify-sm="space-around")
					v-card-title.title.text-sm-h6.text-md-h5.text-lg-h4 Bryllupsplanleggeren
					DatePicker
					v-card-title.title hei {{ name }} 	
		
		List
	v-footer.elevation-10(fixed :padless="true" app)
		v-container
			v-row
				v-col
					v-card-actions.justify-center 
						v-card-title.title  {{ todosDone }} av  {{ todos.length }} oppgaver fullført
				v-col(align-self="center")
					v-card-actions.justify-center 
						NewModal
				v-col(align-self="center")
					transition(name="fade" mode="out-in")
						v-card-actions.justify-center(:key="timeBeforeWedding") 
							v-card-title.title(v-if="timeBeforeWedding") {{ timeBeforeWedding }} til bryllupet
							v-card-title.title(v-else) sett bryllupsdato!
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Greet from "../components/Greet";
import DatePicker from "../components/DatePicker";

import NewModal from "../components/NewModal";
import List from "../components/List";

export default {
  name: "Todo",
  components: {
    List,
    NewModal,
    DatePicker,
    Greet,
  },

  methods: {
    saveWeddingDate(e) {
      console.log(e);
    },
    /* //    (v-on:update:edit="editById($event)")
		editById(id) {
			this.setEditBool(true);
			const item = this.todos.find((o) => o.id === id);
			// clone object
			this.item = { ...item };
		},
		...mapMutations(["setEditBool"]), */
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
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>
