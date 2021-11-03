<template lang="pug">
  v-card.pa-5
      v-form(v-if="newBool || editBool")
        v-row
          v-col
            v-text-field(
              :readonly="todo.readonly"
              placeholder=" "
              persistent-placeholder
              v-model="todo.title"
              type="title"
              label="tittel"
              required
             )
      //- COMMENT
      //- v-row(v-if="todo.comment === '' && !commentEnabled")
      //-   v-col
      //-     v-btn.elevation-0.float-right(color="primary" fab @click="commentEnabled = !commentEnabled")
      //-       v-icon {{ commentEnabled ? 'mdi-message-outline':'mdi-message'   }}
      v-row
        v-col(cols="12")
          v-textarea(
            rows="3" 
            placeholder="skriv her"
            persistent-placeholder
            v-model="todo.comment"
            label="Dine kommentarer"
            multi-line)
            //- v-if="commentEnabled || todo.comment !== '' "
            
        //- Prioritet
        v-col(cols="12")
          v-select(:items="group" :item-value="todo.group" label="velg prioritet")
        //- COMPLETED
        //- TAG
        v-col(cols="6")
          v-select(:items="tags" label="velg 'type' oppgave")
        //- COMPLETED
        v-col(cols="6")
          v-checkbox(v-model="todo.isCompleted" :label="todo.isCompleted ? 'fullført!' : 'Uferdig'")
        //- SAVE
        v-col(cols="12")
          v-btn(
            @click="submittodo"
            block
            large
            class="primary --white-text") lagre oppgave

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["todo"],
  name: "TodoInput",
  data() {
    return {
      commentEnabled: false,
      todoErrorMessage: "",
      tags: ["research", "nice to do", "need to do"],
      group: [
        { text: "første periode", value: "low" },
        { text: "andre periode", value: "medium" },
        { text: "tredje periode", value: "high" },
      ],
    };
  },

  methods: {
    ...mapActions(["newAction", "editAction"]),
    submittodo() {
      /* this.$v.todo.$touch(); */
      /* if (this.$v.todo.$pending || this.$v.todo.$error) return; */

      if (this.editBool) {
        this.editAction(this.todo);
      } else if (this.newBool) {
        this.newAction(this.todo);
      } else {
        console.warn("TodoInput exception error ");
      }
      /* this.$v.todo.$reset(); */
    },
  },
  computed: {
    ...mapState(["editBool", "newBool"]),

    /* commentErrors: {
      get: function () {
        const errors = [];
        if (!this.$v.todo.comment.$dirty) return errors;
        const { maxLength, minLength, required, $params } =
          this.$v.todo.comment;
        !minLength &&
          errors.push(
            `Kommentarer må være minst ${$params.minLength.min} tegn langt`
          );
        !maxLength &&
          errors.push(
            `Kommentarer må være maks ${$params.maxLength.max} tegn langt`
          );
        !required && errors.push("En kommentarer er påkrevet");

        return errors;
      },
    },*/
    /* titleErrors: {
      get: function () {
        const errors = [];
        if (!this.$v.todo.title.$dirty) return errors;
        const { maxLength, minLength, required } = this.$v.todo.title;
        !minLength && errors.push("For få tegn");
        !maxLength && errors.push("For mange tegn");
        !required && errors.push("Tittel er påkrevet");
        return errors;
      },
    }, */
  },
};
</script>
