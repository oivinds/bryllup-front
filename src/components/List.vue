<template lang="pug">
div
	v-spacer.py-4
	Period(:todos="low" v-on:update:edit="editById($event)" title="12 mnd før" description="Research fasen,  Hent inspirasjon og finn ut av deres stil, ønsker og behov for den store dagen")
	v-spacer.py-4
	Period(:todos="medium" v-on:update:edit="editById($event)" title="9 mnd før" description="...")
	v-spacer.py-4
	Period(:todos="high" v-on:update:edit="editById($event)" title="1 mnd før" description="...")
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
    editById(id) {
      this.setEditBool(true);
      const item = this.todos.find((o) => o.id === id);
      // clone object
      this.item = { ...item };
    },
    ...mapMutations(["setEditBool"]),
  },
  computed: {
    ...mapGetters(["todos", "low", "medium", "high"]),
  },
};
</script>
