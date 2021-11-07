<template lang="pug">
v-container
  v-row
    v-col
      v-card
        v-card-title.justify-center  Her kan du sette bryllupsdato og fordele ansvar
  v-row
    v-col
      v-card
        v-card-actions.justify-center 
          v-text-field(
            placeholder="legg til person" label="ansvar"
            v-model="delegate")
          v-btn(@click="setDelegate(delegate)") legg til medhjelper
    v-col
      p(v-for="item in delegates") {{ item}}
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
    ...mapMutations(["setDelegate"]),
  },
  computed: {
    ...mapState(["name", "editBool", "timeBeforeWedding", "delegates"]),
  },
};
</script>
