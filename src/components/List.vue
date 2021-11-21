<template lang="pug">
v-container.my-8
	EditModal(:item="item")
	v-row(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9")
			v-expansion-panels.pb-16(flat accordion)
				v-expansion-panel(:key="index" v-for="(group, index) in 11" )
					v-expansion-panel-header.px-0.pt-0(hide-actions color="background darken-1" v-bind="$attrs")
						PeriodHeader( :title="titleZero(index)" :inc="index" :description="getGroupDescription(index)")
					v-expansion-panel-content(color="background darken-1")
						Period(class="group-expand-item" :key="index"  :dates="dates(index+1)" :todos="getGroup(index+1)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			 
</template>

<script>
import Period from "../components/Period";
import PeriodHeader from "../components/PeriodHeader";
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
  components: { Period, PeriodHeader, EditModal },

  methods: {
    titleZero(i) {
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
    editById(title) {
      this.setEditBool(true);
      const item = this.todos.find((o) => o.title === title);
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
        "...",
        "Hvetebrødsdager og bryllupsreise <3",
        "Rydd opp, si takk og se fremover",
      ];
      return desc[no];
    },
    formatter(duration) {
      let d = this.$moment.duration(duration);

      const years = d.years();
      d = d.subtract({ years });

      const months = d.months();
      d = d.subtract({ months });

      const weeks = d.weeks();
      d = d.subtract({ weeks });

      const days = d.days();
      d = d.subtract({ days });

      const ukePlur = weeks === 1 ? "uke" : "uker";
      const dagPlur = days === 1 ? "dag" : "dager";

      let yearText = years !== 0 ? `${Math.round(years)} år ` : "";

      let monthText = months !== 0 ? `${Math.round(months)} mnd ` : "";

      let weekText = weeks !== 0 ? `${Math.round(weeks)} ${ukePlur} ` : "";

      const dayText = days !== 0 ? `${Math.round(days)} ${dagPlur} ` : "";

      return yearText + monthText + weekText + dayText + " før";
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
    ...mapGetters(["todos", "getDuration"]),
  },
};
</script>
<style lang="scss" scoped>
.expand-transition-enter-active,
.expand-transition-leave-active {
  transition: 1s ease-in-out !important;
}
</style>
