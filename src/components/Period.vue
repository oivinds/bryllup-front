<template lang="pug">
v-row.justify-center
	v-col.mt-4(cols="12")
		v-expansion-panels.pb-8(popout hover )
			v-expansion-panel(v-for="(item, i) in todos" :key="item.title" :class="item.isCompleted ? 'grey' : 'grey darken-3' ")
				v-expansion-panel-header.px-1.px-sm-4(:key="item.title")
					v-list-item.overflow-hidden(dark) 
						v-list-item-action
							v-btn.elevation-1(@click.stop="isCompletedToggleAction(item)" fab 
							:color="item.isCompleted ? 'green' : 'grey lighten-1'"
							v-bind="iconSize")
								v-icon(:color="item.isCompleted ? 'white' : 'grey lighten-4'") mdi-check
						v-list-item-action(v-for="(emo, i) in item.emoji" :key="i")
							img.px-1(height="22" :src="require(`@/assets/emojis/${emo}.png`)")
							//-p(v-for="(emo, i) in item.emoji" height="22" ) {{ emo }}
							
						v-list-item-action(v-if="!item.readonly")
							img.px-1(height="22" :src="require(`@/assets/emojis/person-with-veil_medium-skin-tone_1f470-1f3fd_1f3fd.png`)")
						v-list-item-action(v-if="!item.readonly")
							img.px-1(height="22" :src="require(`@/assets/emojis/person-in-tuxedo_medium-dark-skin-tone_1f935-1f3fe_1f3fe.png`)")
						v-list-item-content
							v-list-item-title.body-1.justify-center.pl-4 {{ item.title }}
						v-list-item-action(v-if="item.delegate && item.delegate !== 'ikke satt'")
							v-chip.pa-2(small class="primary darken-1") {{ item.delegate.length > 7  ? item.delegate.substr(0,5) + ' ..' : item.delegate }}
						//-v-list-item-action
							//-v-icon.pa-4(:color="tagColors[item.tag].color" small) mdi-circle
				
				v-expansion-panel-content.pa-4(:key="item.description")
					v-list-item(v-if="item.readonly")
						v-list-item-content.body-1.font-italic {{ item.content}}
					v-divider.ma-4(v-if="item.readonly")
					v-list-item
						v-list-item-icon
							v-icon mdi-comment-text-outline
						v-list-item-title.overline Mine notater:
					v-list-item
						.body-1 {{item.comment}}
					v-divider.ma-4
					v-list-item(v-if="item.tools.length")
						v-list-item-icon
							v-icon mdi-tools
						v-list-item-title.overline Til inspirasjon:
					v-list-item
						v-list-item-action(v-for="(e, i) in item.tools" :key="i")
							a.mx-auto(style="color:white;" :href="e.url" target="_blank" ) {{e.title}}
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

.image-container {
	display: flex;
	justify-content: center;
}

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
