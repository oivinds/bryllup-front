<template lang="pug">
v-app#app
	v-app
		v-app-bar.elevation-1(app hide-on-scroll dense color="frame" )
			.pa-0.ma-0.pa-lg-16.title.text-md-h6.text-lg-h5 Bryllupsplanleggeren
			v-spacer
			div
				v-tabs.pa-0.pa-lg-16(color="primary" hide-slider)
					v-tab(to='/' color="primary")
						v-icon mdi-cog
					v-tab(to='/todo')
						v-icon mdi-calendar-check
					//- v-tab(@click="unsubscribe()")
					//- 	v-icon mdi-star
		v-main
			transition(name="fade" appear mode="out-in")
				keep-alive
					router-view
		v-footer.elevation-3(app color="frame")
			v-row
				v-col(align-self="center")
					v-card-actions.justify-center
						v-progress-linear(height="40" :value="todosDone" :buffer-value="todos.length")
							template( v-slot:default="{ value }")
								.body-2 {{ value}} av {{todos.length}} gjort
					
				v-col(align-self="center")
					transition(name="fade" mode="out-in" appear)
						v-card-actions.justify-center(:key="timeBeforeWedding") 
							.body-1(v-if="timeBeforeWedding") {{ timeBeforeWedding }} til bryllupet
							.body-1(v-else) foreslått tid 12 mnd!
				

</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { unsubscribe } from "./store/index";

export default {
	name: "App",
	beforeCreate() {
		// TODO: titles to store
		// this.$store.commit("initialiseStore");
	},
	computed: {
		...mapState(["name", "editBool", "timeBeforeWedding", "weddingDate"]),
		...mapGetters(["todosDone", "todos"]),
	},
	methods: {
		unsubscribe() {
			unsubscribe();
			localStorage.clear();
			location.reload();
		},
		...mapActions(["setDuration"]),
	},
	mounted() {
		this.setDuration(this.weddingDate);
	},
};
</script>
<style lang="scss">
#app {
	background-color: var(--v-background-base);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
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
