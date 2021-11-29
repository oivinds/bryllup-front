<template lang="pug">
v-row.justify-center
	v-col.mt-4(cols="12")
		v-expansion-panels.pb-8(popout hover)
			v-expansion-panel(v-for="(item, i) in todos" :key="item.title" :class="item.isCompleted ? 'grey lighten-2' : 'white' ")
				v-expansion-panel-header.px-1.px-sm-4(:key="item.title")
					v-list-item.overflow-hidden 
						v-list-item-action
							v-btn.elevation-1(@click.stop="isCompletedToggleAction(item)" fab 
							:color="item.isCompleted ? 'green' : 'grey lighten-1'"
							v-bind="iconSize")
								v-icon(:color="item.isCompleted ? 'white' : 'grey lighten-4'") mdi-check
						v-list-item-action(v-if="item.emoji")
							h2.pr-4 {{ item.emoji}}
						v-list-item-action(v-if="!item.readonly")
							h2.pr-4 👰🏽 🤵🏾
						v-list-item-content
							v-list-item-title.text-subtitle-1.justify-center {{ item.title }}
						v-list-item-action(v-if="item.delegate && item.delegate !== 'ikke satt'")
							v-chip.pa-4(small dark color="grey-darken4") {{ item.delegate }}
						v-list-item-action
							v-list-item-title.text-subtitle-2.pa-4(v-text="dates")
						v-list-item-action
							v-icon.pa-4(:color="tagColors[item.tag].color" small) mdi-circle
				
				v-expansion-panel-content.pa-4(:key="item.description")
					v-list-item(v-if="item.readonly")
						v-list-item-content.title.font-italic {{ item.content}}
					v-divider.py-4(v-if="item.readonly")
					v-list-item(v-if="item.comment !== ''" )
						v-list-item-icon
							v-icon mdi-comment-text-outline
						v-list-item-title.text-button Mine notater:
					v-list-item
						v-list-item-title.body-1 {{item.comment}}
					v-list-item(v-if="item.tools.length")
						v-list-item-icon
							v-icon mdi-tools
						v-list-item-title.text-button Verktøy:
					v-list-item
						v-list-item-action(v-for="(e, i) in item.tools" :key="i")
							a.mx-auto(:href="'//https://'+e" target="_blank" ) {{e}}
					v-list-item
						v-list-item-content
						v-list-item-action.float-right
							v-btn.mx-2(color="primary" @click="$emit('update:edit', item.id)") Rediger
								v-icon(color="success") mdi-pencil
						v-list-item-action
							DeleteModal(:item="item")
</template>
<script>
import { mapState, mapActions } from "vuex";
import DeleteModal from "../components/DeleteModal";

export default {
	props: ["todos", "title", "description", "iconSize", "dates"],
	data() {
		return {
			selected: null,
			item: {},
			bp: this.$vuetify.breakpoint,
		};
	},
	computed: {
		...mapState(["editBool", "newBool", "tagColors"]),
	},
	methods: {
		isCompletedToggleAction(item) {
			item.isCompleted = !item.isCompleted;
			this.editAction(item);
		},
		...mapActions(["editAction"]),
	},
	components: { DeleteModal },
};
</script>
<style lang="scss" scoped>
$expansion-panel-header-padding: 100px 50px;

.expand-transition-enter-active,
.expand-transition-leave-active {
	transition-duration: 0.4s !important;
}

.moved-leave-active {
	transition: all 0.5s;
}
.moved-leave-to {
	opacity: 0;
	transform: translateX(100%);
}
</style>
