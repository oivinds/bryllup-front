<template lang="pug">
		List
</template>

<script>
import { mapState, mapGetters } from "vuex";

import List from "../components/List";
import NewModal from "../components/NewModal";

export default {
  name: "Todo",
  components: {
    List,
    NewModal,
  },
  computed: {
    ...mapState(["name", "editBool", "timeBeforeWedding"]),
    ...mapGetters(["todos"]),
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
