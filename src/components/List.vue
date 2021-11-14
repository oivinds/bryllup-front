<template lang="pug">
v-container.my-8
	v-row(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9")
			div(v-for="item, index in 6")
				PeriodHeader(:title="title(index)" 
				:description="getGroupDescription(index)")
				Period(:todos="getGroup(index + 1)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
			div
				PeriodHeader( title="En uke før" :description="getGroupDescription(6)")
				Period(:todos="getGroup(7)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader( title="En dag før" :description="getGroupDescription(7)")
				Period(:todos="getGroup(8)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader( title="Bryllupsdagen" :description="getGroupDescription(8)")
				Period(:todos="getGroup(9)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader( title="I etterkant av bryllupet 1-3 mnd" :description="getGroupDescription(9)")
				Period(:todos="getGroup(10)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				PeriodHeader( title="Innen 6 måneder etter bryllupet" :description="getGroupDescription(10)")
				Period(:todos="getGroup(11)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.py-4
				 
</template>

<script>
import Period from "../components/Period";
import PeriodHeader from "../components/PeriodHeader";

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      item: null,
      bp: this.$vuetify.breakpoint,
    };
  },
  components: { Period, PeriodHeader },
  methods: {
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
      console.log(index);
      return (
        Math.floor(
          this.$moment
            .duration(this.getDuration - (index * this.getDuration) / 6)
            .asMonths()
        ).toString() + " mnd før"
      );
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
