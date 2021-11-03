<template lang="pug">
div
	v-row(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9" )
			v-card.elevation-6.my-4(dark color="brown lighten-2")
				v-card-title.text-button.justify-center {{ title}}
				v-card-text.text-body-1 {{ description }}
			v-expansion-panels(hover popout )
				v-expansion-panel(v-for="(item, i) in todos" :key="item.id"  :class="item.isCompleted ? 'grey lighten-3' : '' ")
					v-expansion-panel-header.px-1.px-sm-2.px-md-4
							v-list-item.overflow-hidden 
								v-list-item-action
									v-btn.elevation-1(@click.stop="isCompletedToggleAction(item)" fab small :color="item.isCompleted ? 'primary' : 'grey lighten-1'")
										v-icon(:color="item.isCompleted ? 'white' : 'grey lighten-4'") mdi-check
								v-list-item-content
									v-list-item-title.text-subtitle-1(width="500" v-text="item.title" )
								v-list-item-action
									v-list-item-title.text-subtitle-2(v-text="$moment(item.created).format(bp.smAndUp ? 'MMMM YY' : 'MMM YY')")
					v-expansion-panel-content
						v-list-item
							v-list-item-content
								.body-1 [ Forestill dere redaksjonellt innhold på denne plassen, med bilder og fint formatert tekst ]
						v-divider.pt-4(v-if="item.comment !== ''" )
						v-list-item(v-if="item.comment !== ''" )
							v-list-item-content
								v-list-item-title Dine kommentarer
								v-textarea.body-1(v-text="item.comment")
						v-list-item
							v-list-item-action
								v-btn(@click="$emit('update:edit', item.id)")
									v-icon(color="success") mdi-pencil
							v-list-item-action
								DeleteModal(:item="item")
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
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
    ...mapMutations(["setEditBool"]),
    ...mapActions(["editAction"]),
  },
  components: { DeleteModal, EditModal },
};
</script>
