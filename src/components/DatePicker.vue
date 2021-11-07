<template lang="pug">
    v-dialog(ref='dialog', v-model='modal', :return-value.sync='date', persistent='', width='290px')
      template(v-slot:activator='{ on, attrs }')
        v-text-field.title(  style="max-width:190px;" v-model='computedDateFormatted',  label='velg bryllupsdato', append-icon='mdi-calendar', :readonly='true', v-bind='attrs', v-on='on')
      v-date-picker( color="primary" v-model='date' locale="nb-no" :min="min" :max="max")
        v-spacer
        v-btn(text='', color='primary', @click='modal = false')
          | Avbryt
        //- v-btn(text='', color='primary', @click='$refs.dialog.save(date)')
        v-btn(text='', color='primary', @click='save()')
          | OK

</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      modal: false,
      date: this.$moment().add(1, "year").toISOString().substring(0, 10),
    };
  },
  methods: {
    save() {
      this.$refs.dialog.save(this.date);
      this.setTimeBeforeWedding(this.date);
    },
    formatDate(date) {
      return date ? this.$moment(date).format("LL") : "";
    },
    ...mapActions(["setTimeBeforeWedding"]),
  },
  computed: {
    min() {
      return this.$moment().add(3, "month").toISOString();
    },
    max() {
      return this.$moment().add(5, "year").toISOString();
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    ...mapState(["timeBeforeWedding"]),
  },
};
</script>

<style lang="scss">
.v-picker__title__btn.v-date-picker-title__date.v-picker__title__btn--active
  > div {
  font-family: $heading-font-family;
}
#app
  > div.v-application--wrap
  > main
  > div
  > div
  > div
  > div.v-card.v-sheet.theme--dark.primary
  > div
  > div.v-input.title.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--dark.v-text-field.v-text-field--is-booted
  > div
  > div.v-input__slot
  > div.v-text-field__slot
  > label {
  font-family: $body-font-family;
}
</style>
