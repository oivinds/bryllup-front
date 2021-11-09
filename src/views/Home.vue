<template lang="pug">
v-container
  v-row
    v-col(align-self="center")
      v-card.pa-4(outlined shaped  align-self="center")
          v-card-title.justify-center.headline Velkommen til  bryllupsplanleggeren
          v-card-subtitle.text-center.text-button.py-4 - Et verktøy for å forenkle planleggingen av bryllupet ditt -
          v-card-text.body-1 
            li Start med å skrive navnet på brudeparet
            li legg til navn på personer som kan hjelpe deg, under ansvarlig 
            li Sett bryllupsdatoen
            li Eller hopp rett til 
              router-link(to="/todo") oppgavelisten.
          
  v-row
    v-col.pa-8(cols="6" align-self="center")
      v-card-title
        v-text-field( placeholder="legg til person" label="ansvarlig" v-model="delegate")
        v-card-actions
          v-btn(@click="setDel(delegate)" color="primary" ) legg til 
    v-col.pa-8(cols="6" align-self="center")
      v-card-actions.justify-center Ansvarlige
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
