<template lang="pug">
	v-row(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9" )
			v-card.elevation-0.my-8(rounded color="pink lighten-4")
				v-card-title.text-button.justify-center {{ title}}
				v-card-text.px-md-8.title {{ description }}
			v-expansion-panels(popout hover )
				v-expansion-panel(v-for="(item, i) in todos" :key="item.title" :class="item.isCompleted ? 'grey lighten-1' : '' ")
					v-expansion-panel-header.px-1.px-sm-2.px-md-4(color="white" :key="item.title")
						v-list-item.overflow-hidden 
							v-list-item-action
								v-btn.elevation-1(@click.stop="isCompletedToggleAction(item)" fab small :color="item.isCompleted ? 'primary' : 'grey lighten-1'")
									v-icon(:color="item.isCompleted ? 'white' : 'grey lighten-4'") mdi-check
							v-list-item-content
								v-list-item-title.text-subtitle-1(width="500" v-text="item.title" )
							v-list-item-action
								v-list-item-title.text-subtitle-2(v-text="$moment(item.created).format(bp.smAndUp ? 'MMMM YY' : 'MMM YY')")
							v-list-item-action(v-if="item.delegate && item.delegate !== 'ikke satt'")
								v-chip.pa-4(dark color="secondary") {{item.delegate}}
					v-expansion-panel-content(:key="item.description")
						v-list-item
							v-list-item-content
								.body-1 {{ item.content}}
						v-divider.pt-4(v-if="item.comment !== ''" )
						v-list-item(v-if="item.comment !== ''" )
							v-list-item-content
								v-list-item-title.title Mine notater
								v-textarea.body-1(v-text="item.comment")
						transition(name="fade")
							v-list-item(v-show="!item.isCompleted")
								v-list-item-action
									v-btn(@click="$emit('update:edit', item.title)")
										v-icon(color="success") mdi-pencil
								v-list-item-action
									DeleteModal(:item="item")
</template>
<script>
import { mapState, mapActions } from "vuex";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

export default {
  props: ["todos", "title", "description"],
  data() {
    return {
      selected: null,
      item: {},
      bp: this.$vuetify.breakpoint,
    };
  },
  computed: {
    ...mapState(["editBool", "newBool"]),
  },
  methods: {
    isCompletedToggleAction(item) {
      item.isCompleted = !item.isCompleted;
      this.editAction(item);
    },
    ...mapActions(["editAction"]),
  },
  components: { DeleteModal, EditModal },
};
</script>
<style lang="scss" scoped>
.moved-leave-active {
  transition: all 0.5s;
}
.moved-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
