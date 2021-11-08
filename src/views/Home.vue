<template lang="pug">
v-container
  v-card(align-self="center")
      v-card-title.justify-center.headline Velkommen til  bryllupsplanleggeren
      v-card-text.title - Et verktøy for å forenkle planleggingen av bryllupet ditt -
  v-row
    v-col
        v-card-actions
          v-text-field( placeholder="legg til person" label="ansvarlig" v-model="delegate")
        v-card-actions
          v-btn(@click="setDel(delegate)" color="primary" ) legg til ansvarlig person her
    v-row
      v-col.pa-8(cols="12" align-self="center")
        v-card-actions.justify-center  Ansvarlige
        v-card-actions.justify-center
          transition-group(name="list-complete")
            v-chip.ma-2.pa-3.justify-center(key="0" class="list-complete-item"  
            dark color="tertiary darken-2" label) {{ $store.state.name}}
            v-chip.ma-2.pa-3.justify-center(v-for="item in delegates" :key="item" @click:close="removeDelegate(item)" 
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
