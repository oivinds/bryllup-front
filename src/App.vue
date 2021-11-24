<template lang="pug">
v-app#app
	v-app
		v-app-bar.elevation-4(app hide-on-scroll dense color="white" )
			v-app-bar-title.title.text-md-h6.text-lg-h5.px-12 Bryllupsplanleggeren
			v-spacer
			div
				v-tabs.px-4(color="primary" hide-slider)
					v-tab(to='/' color="primary"  )
						v-icon mdi-cog
					v-tab(to='/todo')
						v-icon mdi-calendar-check
				
		v-main
			transition(name="fade" appear mode="out-in")
				keep-alive
					router-view
		v-footer.elevation-3(app)
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

export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["name", "editBool", "timeBeforeWedding", "weddingDate"]),
    ...mapGetters(["todosDone", "todos"]),
  },
  methods: {
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
