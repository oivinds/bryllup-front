<template lang="pug">
  v-card.pa-5(color="grey lighten-3" )
      v-form(v-if="newBool || editBool")
        v-row
          v-col
            v-text-field(
              :readonly="todo.readonly"
              :placeholder="!todo.readonly ? 'Skriv navn på oppgave' : ''"
              v-model="todo.title"
              :label="!todo.readonly ? 'tittel' : '' "
              required
             )
        v-row
          //- CONTENT
          v-col
            v-textarea(
              :readonly="todo.readonly"
              v-model="todo.content"
              :label="!todo.readonly ? 'innhold' : '' "
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
            
        //- group
        v-col(cols="6")
          v-select(:items="group" :value="todo.group" @change="groupChange" label="velg gruppe")
        //- responsability
        v-col(cols="6")
          v-select(:items="getDelegates" :value="todo.delegate" @change="delegateChange" label="velg ansvarlig")
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: ["todo"],
  name: "TodoInput",
  data() {
    return {
      commentEnabled: false,
      todoErrorMessage: "",
      tags: ["research", "nice to do", "need to do"],
      group: [
        { text: "første periode", value: 1 },
        { text: "andre periode", value: 2 },
        { text: "tredje periode", value: 3 },
      ],
    };
  },

  methods: {
    groupChange(e) {
      console.log(e);
      this.todo.group = e;
    },
    delegateChange(e) {
      console.log(e);
      this.todo.delegate = e;
    },
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
    ...mapGetters(["getDelegates"]),

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
