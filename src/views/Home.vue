<template lang="pug">
v-container
    v-card
      v-card-title.justify-center Innstillinger for  bryllupsplanleggeren
    v-row
      v-col(cols="12" md="6")
        v-card-actions.justify-center 
          v-text-field(

            placeholder="legg til person" label="ansvarlig"
            v-model="delegate")
        v-card-actions.justify-center 
            v-btn(@click="setDel(delegate)") legg til medhjelper
      v-col.pa-8(cols="12" md="6")
        v-chip.ma-2(v-for="item in delegates" :key="item" 
        @click:close="removeDelegate(item)" close close-icon="mdi-delete" 
        color="yellow" label ) {{ item}}
    v-row
      v-col    
        v-card
          v-card-actions.justify-center 
            DatePicker
    
</template>

<script>
import DatePicker from "../components/DatePicker";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      delegate: null,
    };
  },
  components: { DatePicker },
  methods: {
    setDel(o) {
      this.setDelegate(o);
      this.delegate = null;
    },
    ...mapMutations(["setDelegate", "removeDelegate"]),
  },
  computed: {
    ...mapState(["name", "editBool", "timeBeforeWedding", "delegates"]),
  },
};
</script>
