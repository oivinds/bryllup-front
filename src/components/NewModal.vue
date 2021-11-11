<template lang="pug">

div
	v-btn(v-if="!dialog" @click="doNew()" color="primary" 
  :x-large="bp.xl" 
  :large="bp.lg" 
  :md="bp.md" 
  :sm="bp.sm" 
  ) lag ny todo
	v-dialog(v-model="dialog" :width="bp.mdAndUp  ? '50%' : '95%'" v-on:click:outside="setNewBool(false)")
		TodoInput(v-if="newBool" :todo="todo")

</template>

<script>
import TodoInput from "../components/TodoInput";
import { mapMutations, mapState } from "vuex";

export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      todo: {
        title: "",
        content: "",
        group: "",
        type: "",
        comment: "",
        isCompleted: false,
        readonly: false,
      },
      bp: this.$vuetify.breakpoint,
    };
  },
  watch: {
    newBool(bool) {
      this.dialog = bool;
      if (bool) {
        this.todo.title = "";
        this.todo.content = "";
        this.todo.group = "";
        this.todo.type = "";
        this.todo.comment = "";
        this.todo.isCompleted = false;
        this.todo.readonly = false;
      }
    },
  },
  components: { TodoInput },
  methods: {
    doNew() {
      this.setNewBool(true);
    },
    ...mapMutations(["setNewBool"]),
  },
  computed: {
    ...mapState(["newBool", "editBool"]),
  },
};
</script>
