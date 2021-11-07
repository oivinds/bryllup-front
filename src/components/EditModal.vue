<template lang="pug">
		div
			v-dialog(v-model="dialog" :width="bp.mdAndUp  ? '50%' : '95%'" v-on:click:outside="setEditBool(false)")
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
      console.log(this.item);
      return { ...this.item };
    },
    ...mapState(["editBool"]),
    ...mapGetters(["todos"]),
  },
};
</script>
