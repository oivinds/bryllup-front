<template lang="pug">
	v-container.my-8
		v-btn( @click="doNew()" color="primary" 
		:x-large="bp.xl" 
		:large="bp.lg" 
		:md="bp.md" 
		:sm="bp.sm" 
		) lag ny todo
		NewModal
		List
</template>

<script>
import List from "../components/List";
import NewModal from "@/components/NewModal";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Todo",
  components: {
    List,
    NewModal,
  },
  data() {
    return {
      bp: this.$vuetify.breakpoint,
    };
  },
  methods: {
    ...mapMutations(["setNewBool"]),

    doNew() {
      this.setNewBool(true);
    },
  },
  computed: {
    ...mapState(["newBool", "editBool"]),
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
