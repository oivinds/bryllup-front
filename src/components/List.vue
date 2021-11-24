<template lang="pug">
div
	EditModal(:item="item")
	v-row(justify="center")
		v-col(cols="12" sm="11" md="8" lg="7" xl="6")
			v-expansion-panels(flat accordion)
				v-expansion-panel.ma-2(:key="index" v-for="(group, index) in 11" )
					v-expansion-panel-header.elevation-6(class="white--text" rounded :color="cl(index)")
						v-row
							v-col.pb-0(cols="12") 
								//-v-card-title.text-button.justify-center {{ durTitle(index) }} 
								v-card-title.text-button.justify-center {{ createTitles(index) }} 
							v-col.pa-0(cols="12") 
								v-card-text.pa-md-4.title {{ getGroupDescription(index) }}
					v-expansion-panel-content.py-4(color="background")
						Period(class="group-expand-item" :key="index"  :dates="dates(index+1)" :todos="getGroup(index+1)" v-on:update:edit="editById($event)" :iconSize="iconSize")

</template>

<script>
import Period from "../components/Period";
import EditModal from "../components/EditModal";

import { mapActions, mapGetters, mapMutations } from "vuex";
let titleArray = [];
export default {
  data() {
    return {
      item: null,
      bp: this.$vuetify.breakpoint,
    };
  },
  components: { Period, EditModal },

  methods: {
    durTitle(i) {
      return this.durTitles[i];
    },
    cl(i) {
      const colors = [
        "purple darken-3",
        "deep-purple darken-3",
        "indigo darken-3",
        "blue darken-3",
        "cyan darken-3",
        "teal darken-3",
        "green darken-3",
        "light-green darken-3",
        "lime darken-3",
        "amber darken-3",
        "orange darken-3",
      ];

      colors.reverse();
      return colors[i];
    },
    createTitles(i) {
      let title;
      title = i;
      if (i > 5) {
        switch (i) {
          case 6:
            title = "En uke før";
            break;
          case 7:
            title = "En dag før";
            break;
          case 8:
            title = "Bryllupsdagen";
            break;
          case 9:
            title = "I etterkant av bryllupet 1-3 mnd";
            break;
          case 10:
            title = "Innen 6 måneder etter bryllupet";
            break;
        }
      } else {
        const duration = this.getDuration - (i * this.getDuration) / 6;
        title = this.formatter(duration);
      }
      titleArray.push(title);
      return title;
    },

    ...mapMutations(["setEditBool"]),
    ...mapActions(["setGroupTitles"]),

    dates(index) {
      const duration = (index * this.getDuration) / 6;
      return this.$moment().add(duration).format("MMMM YY");
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
    getGroupDescription(no) {
      const desc = [
        "Research-fasen. Hent inspirasjon og finn ut av deres stil, ønsker og behov for den store dagen.",
        "Book det viktigste. Og etter det: Ha det gøy med planleggingsfasens morsomste research!",
        "Nyt!! Kanskje en av de herligste periodene er nettopp nå: Gaveliste, brudekjoleprøving, gifteringer, forlovelsesfotografering mm!",
        "Hold hodet kaldt! Dette er månedene hvor dere skal fikse alt det praktiske. Book inn det som gjenstår.",
        "Kom i feststemning! Det er på tiden å legge vekt på de gøyale tingene ved bryllupet, festen og reisen.",
        "Siste innkjøp. Bekreft til leverandører og senk skuldrene!",
        "Det kribler! Site touch og pakking til både bryllupshelg, selve dagen og bryllupsreisen!",
        "Pust med magen, nyt en manikyr og pedikyr - smil til hverandre og gå tidlig i seng.",
        " ",
        "Hvetebrødsdager og bryllupsreise <3",
        "Rydd opp, si takk og se fremover",
      ];
      return desc[no];
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
  watch: {
    getDuration() {
      titleArray = [];
      this.$nextTick(function () {
        const titles = [...titleArray];
        this.setGroupTitles(titles);
      });
    },
  },
  mounted() {
    const titles = [...titleArray];
    this.setGroupTitles(titles);
  },
  computed: {
    iconSize() {
      return {
        "x-small": this.bp.xs,
        small: this.bp.smAndUp,
      };
    },
    ...mapGetters(["todos", "getDuration", "durTitles"]),
  },
};
</script>
<style lang="scss" scoped>
.expand-transition-enter-active,
.expand-transition-leave-active {
  transition: 1s ease-out !important;
}
</style>
