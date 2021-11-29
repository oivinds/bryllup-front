<template lang="pug">

		v-card.pa-8(color="grey lighten-3" )
			v-form(v-if="newBool || editBool")
				//- TITLE
				v-row
					v-col(v-if="!todo.readonly")
						v-text-field(
							:placeholder="!todo.readonly ? 'Skriv navn på oppgave' : ''"
							v-model="todo.title"
							label="tittel"
							required)
					v-col(v-else)
						.headline {{ todo.title}}

						
				v-row
					//- CONTENT
					v-col(v-if="todo.readonly")
						.title {{ todo.content}}
				v-row
					v-col(cols="12")
						v-textarea(
							rows="3" 
							placeholder="skriv her"
							persistent-placeholder
							v-model="todo.comment"
							label="Mine notater"
							multi-line
							append-outer-icon="mdi-message-text-outline"
							)
 
					v-col(cols="12")
						v-select( :items="group" :value="todo.group" toggle-keys="[13,32]" @change="groupChange" label="velg periode for å utføre oppgaven")
							template( v-slot:selection="{ item, index}")
								v-btn.mt-2( block tile dense :color="item.color" elevation="0") {{item.text}}
							template(v-slot:item="{ on, active, item, attrs }" ) 
								v-btn(block tile dense v-bind="attrs" :color="item.color" elevation="0") {{ item.text }} 
					 
					//- RESPONSABILITY
					v-col(cols="6" v-if="getDelegates.length > 1")
						v-select(:items="getDelegates" :value="todo.delegate" @change="delegateChange" label="velg ansvarlig")
							
					//- TAG / PRIORITY
					v-col(cols="6")
						v-select(:items="tagColors" :value="todo.tag" @change="tagChange" label="sett viktighet")
							template( v-slot:selection="{ item, index}")
								v-btn.mt-2( block tile dense :color="item.color" elevation="0") {{item.text}}
							template(v-slot:item="{ on, active, item, attrs }" ) 
								v-btn(block tile dense v-bind="attrs" :color="item.color" elevation="0") {{ item.text }} 
					//- COMPLETED
					//- v-col(cols="6")
					//-   v-checkbox(v-model="todo.isCompleted" :label="todo.isCompleted ? 'fullført!' : 'Uferdig'")
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
		};
	},

	methods: {
		col(i) {
			const test = ["red", "green"];
			return test[i];
		},
		...mapActions(["newAction", "editAction"]),
		groupChange(e) {
			this.todo.group = e;
		},
		tagChange(e) {
			this.todo.tag = e;
		},
		categoryChange(e) {
			this.todo.category = e;
		},
		delegateChange(e) {
			this.todo.delegate = e;
		},
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
		group() {
			return this.testTitles.map((item, index) => ({
				text: item,
				value: index + 1,
				color: this.groupColors[index],
			}));
		},

		delegatesInput() {
			if (this.getDelegates === [null]) {
				return ["empty"];
			} else {
				return [...this.getDelegates];
			}
		},
		//
		...mapState(["editBool", "newBool", "categories", "tagColors"]),
		...mapGetters(["getDelegates", "testTitles", "groupColors"]),

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
