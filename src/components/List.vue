<template lang="pug">
v-container.my-8
	EditModal(:item="item")
	v-row(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9")
			div(v-for="todo, index in 6")
				PeriodHeader(:title="title(index)" :inc="index" 
				:description="getGroupDescription(index)")
				Period(:dates="dates(index+1)" :todos="getGroup(index + 1)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
			div
				PeriodHeader(inc="6" title="En uke før" :description="getGroupDescription(6)")
				Period(:dates="dates(7)" :todos="getGroup(7)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader(inc="7" title="En dag før" :description="getGroupDescription(7)")
				Period(  :todos="getGroup(8)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader(inc="8" title="Bryllupsdagen" :description="getGroupDescription(8)")
				Period(:todos="getGroup(9)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader(inc="9" title="I etterkant av bryllupet 1-3 mnd" :description="getGroupDescription(9)")
				Period(:todos="getGroup(10)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader(inc="10" title="Innen 6 måneder etter bryllupet" :description="getGroupDescription(10)")
				Period(:todos="getGroup(11)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				 
</template>

<script>
import Period from "../components/Period";
import PeriodHeader from "../components/PeriodHeader";
import EditModal from "../components/EditModal";

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      item: null,
      bp: this.$vuetify.breakpoint,
    };
  },
  components: { Period, PeriodHeader, EditModal },
  methods: {
    dates(index) {
      const duration = this.getDuration - (index * this.getDuration) / 6;

      return this.$moment().add(duration, "milliseconds").format("MMMM YY");
    },
    editById(title) {
      this.setEditBool(true);
      const item = this.todos.find((o) => o.title === title);
      // clone object
      this.item = { ...item };
    },
    getGroup(nr) {
      const group = this.todos.filter((todo) => todo.group === nr);
      return [...group];
    },

    title(index) {
      const duration = this.getDuration - (index * this.getDuration) / 6;

      let d = this.$moment.duration(duration);

      const years = d.years();
      d = d.subtract({ years });

      const months = d.asMonths();
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

    getGroupDescription(no) {
      const desc = [
        "Research-fasen. Hent inspirasjon og finn ut av deres stil, ønsker og behov for den store dagen.",
        "Book det viktigste. Og etter det: Ha det gøy med planleggingsfasens morsomste research!",
        "...",
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
    ...mapMutations(["setEditBool"]),
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
