<template lang="pug">

v-expansion-panels(popout hover )
  
  v-expansion-panel(v-for="(item, i) in todos" :key="item.title" :class="item.isCompleted ? 'grey lighten-2' : 'white' ")
    
    v-expansion-panel-header.px-1.px-sm-2.px-md-4(:key="item.title")
      v-list-item.overflow-hidden 
        v-list-item-action
          v-btn.elevation-1(@click.stop="isCompletedToggleAction(item)" fab 
          :color="item.isCompleted ? 'green' : 'grey lighten-1'"
          v-bind="iconSize"  
          )
            v-icon(:color="item.isCompleted ? 'white' : 'grey lighten-4'") mdi-check
        v-list-item-content
          v-list-item-title.text-subtitle-1(width="500" v-text="item.title" )
        v-list-item-content(v-if="item.emoji")
          h2 {{ item.emoji}}
        v-list-item-action
          v-list-item-title.text-subtitle-2(v-text="dates")
          //-v-list-item-title.text-subtitle-2(v-text="$moment(item.created).format(bp.smAndUp ? 'MMMM YY' : 'MMM YY')")
        v-list-item-action(v-if="item.delegate && item.delegate !== 'ikke satt'")
          v-chip.pa-4(dark color="secondary") {{item.delegate}}
    
    v-expansion-panel-content(:key="item.description")
      v-list-item
        v-list-item-content
          .title {{ item.content}}
      v-divider.pt-4(v-if="item.comment !== ''" )
      v-list-item(v-if="item.comment !== ''" )
        v-list-item-content
          v-list-item-title.text-button Mine notater
          v-textarea.body-1(v-text="item.comment")
      v-list-item
        v-list-item-content(v-if="item.category")
          v-list-item-title.text-button {{ item.category}}
        //-(v-show="!item.isCompleted")
        v-list-item-action
          v-btn(color="primary" @click="$emit('update:edit', item.title)") Rediger
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
    ...mapState(["editBool", "newBool"]),
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
.moved-leave-active {
  transition: all 0.5s;
}
.moved-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
