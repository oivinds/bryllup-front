<template lang="pug">
v-container
	Period(:todos="getGroup(1)" v-on:update:edit="editById($event)" title="12 mnd før" description="Research fasen,  Hent inspirasjon og finn ut av deres stil, ønsker og behov for den store dagen")
	v-spacer.py-4
	Period(:todos="getGroup(2)" v-on:update:edit="editById($event)" title="9 mnd før" description="Book det viktigste. Og etter det: Ha det gøy med planleggingsfasens morsomste research!")
	v-spacer.py-4
	Period(:todos="getGroup(3)" v-on:update:edit="editById($event)" title="8 mnd før" description="Nyt!! Kanskje en av de herligste periodene er nettopp nå: Gaveliste, brudekjoleprøving, gifteringer, forlovelsesfotografering mm!")
	v-spacer.py-4
	EditModal(:item="item")
</template>

<script>
import Period from "../components/Period";
import EditModal from "../components/EditModal";

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      item: null,
    };
  },
  components: { Period, EditModal },
  methods: {
    editById(title) {
      this.setEditBool(true);
      const item = this.todos.find((o) => o.title === title);
      // clone object
      this.item = { ...item };
    },
    getGroup(nr) {
      const group = this.todos.filter((todo) => todo.group === nr);
      return [...group];
    },
    ...mapMutations(["setEditBool"]),
  },
  computed: {
    ...mapGetters(["todos"]),
  },
};
</script>
