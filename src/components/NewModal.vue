<template lang="pug">

div
	
	v-dialog(v-model="dialog" :width="bp.mdAndUp  ? '43%' : '85%'" v-on:click:outside="setNewBool(false)")
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
			bp: this.$vuetify.breakpoint,
			todo: {
				title: "",
				content: "",
				group: "",
				tag: "",
				comment: "",
				isCompleted: false,
				readonly: false,
			},
		};
	},
	watch: {
		newBool(bool) {
			this.dialog = bool;
			if (bool) {
				this.todo.title = "";
				this.todo.content = "";
				this.todo.group = "";
				this.todo.tag = "";
				this.todo.category = "";
				this.todo.comment = "";
				this.todo.isCompleted = false;
				this.todo.readonly = false;
			}
		},
	},
	components: { TodoInput },
	methods: {
		...mapMutations(["setNewBool"]),
	},
	computed: {
		...mapState(["newBool", "editBool"]),
	},
};
</script>
