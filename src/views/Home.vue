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
            v-btn(@click="setDel(delegate)" color="primary" ) legg til medhjelper
      v-col.pa-8(cols="12" md="6")
        v-chip.ma-2.pa-8(dark color="tertiary" label) {{ $store.state.name}}
        transition-group(name="list-complete")
          v-chip.ma-2.pa-8(v-for="item in delegates" :key="item" @click:close="removeDelegate(item)" 
          close close-icon="mdi-delete" 
          dark color="tertiary" label
          class="list-complete-item" 
          ) {{ item}}
    
    
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

<style lang="scss">
.list-complete-item {
  transition: all 0.4s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
