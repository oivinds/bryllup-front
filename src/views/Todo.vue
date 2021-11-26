<template lang="pug">
	v-container
		NewModal
		v-btn( 
		@click="setNewBool(true)" 
		color="primary" 
		fab
		small
		style="position:fixed;top:100px;right:100px;zIndex:2222;"
		)
			v-icon mdi-plus 
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
