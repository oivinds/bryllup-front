<template lang="pug">
v-container.my-8
	EditModal(:item="item")
	v-row(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9")
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleZero" :inc="0" :description="getGroupDescription( 0 )")
			transition(name="fade")
				Period(v-show="shows[0].show" :dates="dates(1)" :todos="getGroup(1)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4
			
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleOne" :inc="1" :description="getGroupDescription( 1 )")
			transition(name="fade")
				Period(v-show="shows[1].show" :dates="dates(2)" :todos="getGroup( 2)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4
			
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleTwo" :inc="2" :description="getGroupDescription( 2 )")
			transition(name="fade")
				Period(v-show="shows[2].show" :dates="dates(3)" :todos="getGroup( 3)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4
			
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleThree" :inc="3" :description="getGroupDescription( 3 )")
			transition(name="fade")
				Period(v-show="shows[3].show" :dates="dates(4)" :todos="getGroup( 4)" v-on:update:edit="editById($event)" :iconSize="iconSize")
				v-spacer.pb-4
			
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleFour" :inc="4" :description="getGroupDescription( 4 )")
			transition(name="fade")
				Period(v-show="shows[4].show" :dates="dates(5)" :todos="getGroup( 5)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4
			
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleFive" :inc="5" :description="getGroupDescription( 5 )")
			transition(name="fade")
				Period(v-show="shows[5].show" :dates="dates(6)" :todos="getGroup( 6)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4
			
			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleSix" inc="6" :description="getGroupDescription(6)")
			transition(name="fade")
				Period(v-show="shows[6].show"   :todos="getGroup(7)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4

			PeriodHeader(v-on:update:showToggle="toggle($event)" :title="titleSeven" inc="7" :description="getGroupDescription(7)")
			transition(name="fade")
				Period(v-show="shows[7].show"   :todos="getGroup(8)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4

			PeriodHeader(v-on:update:showToggle="toggle($event)" inc="8" :title="titleEight" :description="getGroupDescription(8)")
			transition(name="fade")
				Period(v-show="shows[8].show" :todos="getGroup(9)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4

			PeriodHeader(v-on:update:showToggle="toggle($event)" inc="9" :title="titleNine"  :description="getGroupDescription(9)")
			transition(name="fade")
				Period(v-show="shows[9].show" :todos="getGroup(10)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4

			PeriodHeader(v-on:update:showToggle="toggle($event)" inc="10" :title="titleTen"  :description="getGroupDescription(10)")
			transition(name="fade")
				Period(v-show="shows[10].show" :todos="getGroup(11)" v-on:update:edit="editById($event)" :iconSize="iconSize")
			v-spacer.pb-4
				 
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
      titles: [],
      shows: [
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
        { show: true },
      ],
    };
  },
  components: { Period, PeriodHeader, EditModal },
  methods: {
    toggle(no) {
      this.shows[no].show = !this.shows[no].show;
    },
    ...mapMutations(["setEditBool", "setGroupTitles"]),

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
    formatter(duration) {
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
  },
  watch: {
    "$store.getters.getDuration"() {
      this.setGroupTitles(this.titleArray);
    },
  },
  mounted() {
    this.setGroupTitles(this.titleArray);
  },
  computed: {
    titleArray() {
      return [
        this.titleZero,
        this.titleOne,
        this.titleTwo,
        this.titleThree,
        this.titleFour,
        this.titleFive,
        this.titleSix,
        this.titleSeven,
        this.titleEight,
        this.titleNine,
        this.titleTen,
      ];
    },
    titleZero() {
      const duration = this.getDuration - (0 * this.getDuration) / 6;
      const title = this.formatter(duration);
      return title;
    },
    titleOne() {
      const duration = this.getDuration - (1 * this.getDuration) / 6;
      const title = this.formatter(duration);
      return title;
    },
    titleTwo() {
      const duration = this.getDuration - (2 * this.getDuration) / 6;
      const title = this.formatter(duration);
      return title;
    },
    titleThree() {
      const duration = this.getDuration - (3 * this.getDuration) / 6;
      const title = this.formatter(duration);
      return title;
    },
    titleFour() {
      const duration = this.getDuration - (4 * this.getDuration) / 6;
      const title = this.formatter(duration);
      return title;
    },
    titleFive() {
      const duration = this.getDuration - (5 * this.getDuration) / 6;
      const title = this.formatter(duration);
      return title;
    },
    titleSix() {
      /* const duration = this.getDuration - (5 * this.getDuration) / 6;
			const title = this.formatter(duration); */
      return "En uke før";
    },
    titleSeven() {
      /* const duration = this.getDuration - (5 * this.getDuration) / 6;
			const title = this.formatter(duration); */
      return "En dag før";
    },
    titleEight() {
      /* const duration = this.getDuration - (5 * this.getDuration) / 6;
			const title = this.formatter(duration); */
      return "Bryllupsdagen";
    },
    titleNine() {
      /* const duration = this.getDuration - (5 * this.getDuration) / 6;
			const title = this.formatter(duration); */
      return "I etterkant av bryllupet 1-3 mnd";
    },
    titleTen() {
      /* const duration = this.getDuration - (5 * this.getDuration) / 6;
			const title = this.formatter(duration); */
      return "Innen 6 måneder etter bryllupet";
    },

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
