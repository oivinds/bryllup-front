<template lang="pug">
		div
			v-dialog(v-model="dialog" :width="bp.mdAndUp  ? '40%' : '85%'" v-on:click:outside="setEditBool(false)")
				v-card
					TodoInput(:todo="todo")
</template>

<script>
import TodoInput from "../components/TodoInput";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      bp: this.$vuetify.breakpoint,
    };
  },
  watch: {
    editBool(bool) {
      this.dialog = bool;
    },
  },
  components: { TodoInput },
  methods: {
    ...mapMutations(["setEditBool"]),
  },

  computed: {
    todo() {
      return { ...this.item };
    },
    ...mapState(["editBool"]),
    ...mapGetters(["todos"]),
  },
};
</script>
