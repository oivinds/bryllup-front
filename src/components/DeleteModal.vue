<template lang="pug">
    v-row
      v-btn(color="primary"  dark @click.stop="model = true") slett
        v-icon(color="warning") mdi-trash-can
      v-dialog(v-model='model', max-width='290')
        v-card
          v-card-title.text-h5
            | Bekreft sletting
          v-card-text
            | Er du sikker på at du vil slette oppgaven permanent?
          v-card-actions
            v-spacer
            v-btn(color='green darken-1', text='', @click='model = false')
              | Nei
            v-btn(color='green darken-1', text='', @click="destroy(item)")
              | Ja

</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["item"],

  data() {
    return {
      model: false,
    };
  },
  methods: {
    destroy(el) {
      this.deleteAction(el);
      this.model = false;
    },
    ...mapActions(["deleteAction"]),
  },
};
</script>
