<template lang="pug">
div
	EditModal(:item="item")
	v-row(justify="center")
		v-col(cols="12" )
			v-expansion-panels(flat accordion hover )
				v-expansion-panel.ma-2(:key="index" v-for="(group, index) in testTitles" )
					v-expansion-panel-header.my-2(:ripple="{class:'white--text'}" class="accent--text" class="rounded-lg" :color="groupColors[index]" rounded)
						v-row
							v-col.pa-0(cols="12") 
								v-card-title.text-button.justify-center {{ group }} 
							v-col(cols="12") 
								v-card-title.pa-md-4.title.justify-center {{ description[index] }}
							v-col.pa-0(cols="12")
							transition(name="fadeSlide" mode="out-in") 
								v-rating(v-if="!getGroupDone(index + 1).allDone" readonly model="rating" :value="getGroupDone(index + 1).done" :length="getGroup(index+1).length")
								div(v-else style="width:100%;  text-align:center")
									v-avatar( color="background" size="32" )
										v-icon.elevation-10(color="amber") mdi-star
											.caption Fullført!
					v-expansion-panel-content.py-0(color="background")
						Period(class="group-expand-item" :key="index"  :dates="dates(index+1)" :todos="getGroup(index+1)"  v-on:update:edit="editById($event)" :iconSize="iconSize")

</template>

<script>
import Period from "../components/Period";
import EditModal from "../components/EditModal";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			item: null,
			bp: this.$vuetify.breakpoint,
			description: [
				"Research-fasen. Hent inspirasjon og finn ut av deres stil, ønsker og behov for den store dagen.",
				"Book det viktigste. Og etter det: Ha det gøy med planleggingsfasens morsomste research!",
				"Nyt!! Kanskje en av de herligste periodene er nettopp nå: Gaveliste, brudekjoleprøving, gifteringer, forlovelsesfotografering mm!",
				"Hold hodet kaldt! Dette er månedene hvor dere skal fikse alt det praktiske. Book inn det som gjenstår.",
				"Kom i feststemning! Det er på tiden å legge vekt på de gøyale tingene ved bryllupet, festen og reisen.",
				"Siste innkjøp. Bekreft til leverandører og senk skuldrene!",
				"Det kribler! Site touch og pakking til både bryllupshelg, selve dagen og bryllupsreisen!",
				"Pust med magen, nyt en manikyr og pedikyr - smil til hverandre og gå tidlig i seng.",
				"Kooos dere med den store dagen",
				"Hvetebrødsdager og bryllupsreise <3",
				"Rydd opp, si takk og se fremover",
			],
		};
	},
	components: { Period, EditModal },

	methods: {
		...mapMutations(["setEditBool"]),
		...mapActions(["setGroupTitles"]),
		dates(index) {
			const duration = (index * this.getDuration) / 6;
			return this.$moment().add(duration).format("MMM YY");
		},
		editById(id) {
			this.setEditBool(true);
			const item = this.todos.find((o) => o.id === id);
			this.item = { ...item };
		},
		getGroup(nr) {
			const group = this.todos.filter((todo) => todo.group === nr);
			return [...group];
		},
		getGroupDone(nr) {
			const group = this.todos.filter((todo) => todo.group === nr);
			const done = group.filter((o) => o.isCompleted);
			//const notDone = { done: , length: group.length };
			const allDone = group.length === done.length;
			const result = { length: group.length, done: done.length, allDone };
			/* 	group.length === done.length
					? "alle oppgaver fullført!"
					: `${done.length} / ${group.length}`; */
			return result;
		},

		formatter(duration) {
			let d = this.$moment.duration(duration);
			d.add({ day: 2 });

			const years = d.years();
			d.subtract({ years });

			const months = d.months();
			/* const months = d.months(); */
			d.subtract({ months: Math.floor(months) });

			const weeks = d.weeks();
			/* d = d.subtract({ weeks }); */

			/* 
			const days = d.days();
			const asDays = d.asDays();
			d = d.subtract({ days }); */

			const ukePlur = weeks === 1 ? "uke" : "uker";
			/* const dagPlur = days === 1 ? "dag" : "dager" */ let yearText =
				years !== 0 ? `${years} år ` : "";

			let monthText = months !== 0 ? `${months} mnd ` : "";

			let weekText = weeks !== 0 ? `${weeks} ${ukePlur} ` : "";

			/* const dayText = asDays !== 0 ? `${days} ${dagPlur} ` : ""; */

			return yearText + monthText + weekText + " før";
		},
	},

	computed: {
		iconSize() {
			return {
				"x-small": this.bp.xs,
				small: this.bp.smAndUp,
			};
		},
		...mapGetters([
			"testTitles",
			"todos",
			"getDuration",
			"durTitles",
			"groupColors",
		]),
	},
};
</script>
<style lang="scss" scoped>
.expand-transition-enter-active,
.expand-transition-leave-active {
	transition: 0.6s ease-in-out !important;
}

.theme--light.v-expansion-panels .v-expansion-panel {
	background-color: var(--v-background-base);
}

.v-card__text,
.v-card__title {
	word-break: normal; /* maybe !important  */
}
</style>
