<template lang="pug">
v-app#app
	v-app
		v-app-bar(app dark color="tertiary lighten-1")
			.title.text-md-h6.text-lg-h5.px-12 Bryllupsplanleggeren
			v-tabs.px-4(centered hide-slider)
				v-tab(to='/' color="primary" )
					v-icon mdi-cog
				v-tab(to='/todo' color="primary" )
					v-icon mdi-calendar-check
			transition(name="fade" appear mode="out-in")
				div.px-12
					div(v-if="$route.path === '/todo'")
						NewModal
					div(v-else style="opacity:0;")
						NewModal
		v-main
			router-view
		v-footer.elevation-10(app dark color="pink lighten-2")
			v-row
				v-col(align-self="center")
					v-card-actions.justify-center 
						.body-1 {{ todosDone }} av  {{ todos.length }} oppgaver fullført
				v-col(align-self="center")
					transition(name="fade" mode="out-in" appear)
						v-card-actions.justify-center(:key="timeBeforeWedding") 
							.body-1(v-if="timeBeforeWedding") {{ timeBeforeWedding }} til bryllupet
							.body-1(v-else) foreslått tid 12 mnd!
				
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
  background-color: var(--v-background-lighten2);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fadeSlide-enter-active,
.fadeSlide-leave-active {
  transition: all 0.5s;
}
.fadeSlide-enter, .fadeSlide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>
