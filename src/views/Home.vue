<template lang="pug">
v-container.mb-12
  v-row.pa-4(justify="center")
    v-card.justify-center(  shaped)
      v-card-title.justify-center.headline Velkommen til  bryllupsplanleggeren
      v-card-subtitle.text-center.text-button.py-4 - Et verktøy for å forenkle planleggingen av bryllupet ditt -
      v-card-text.body-1 
        li Start med å skrive inn navnene på brudeparet
        li legg til navn på personer som kan hjelpe deg, under ansvarlig 
        li Sett bryllupsdatoen
        li Eller hopp rett til 
          router-link(to="/todo") oppgavelisten. 
      v-col.pa-8(cols="12" align-self="center")
        v-card-title Hva er Brudeparets navn?
        v-card-actions
          v-text-field( placeholder="Skriv ditt fornavn" label="meg" v-model="owner")
          v-card-actions
            v-btn(@click="setOwnerLocal(owner)" color="primary" ) legg til 
      v-col.pa-8(cols="12" align-self="center")
        v-card-title
          v-text-field( placeholder="Skriv fornavn" label="blivende ektefelle" v-model="partner")
          v-card-actions
            v-btn(@click="setPartnerLocal(partner)" color="primary" ) legg til  
      v-col.pa-8(cols="12" align-self="center")
        v-card-title
          v-text-field( placeholder="legg til person" label="ansvarlig" v-model="delegate")
          v-card-actions
            v-btn(@click="setDel(delegate)" color="primary" ) legg til 
      v-col.pa-8(cols="12" align-self="center")
      
        v-card-actions.justify-center
          transition-group(name="list-complete")
            v-chip.ma-2.pa-3.justify-center(key="0" class="list-complete-item"  
            dark color="tertiary darken-2" label) {{ $store.state.owner}}
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
      delegate: "",
      owner: "",
      partner: "",
    };
  },
  components: { DatePicker },
  methods: {
    setDel(o) {
      this.setDelegate(o);
      this.delegate = "";
    },
    setOwnerLocal(o) {
      this.setOwner(o);
      this.owner = "";
    },
    setPartnerLocal(o) {
      this.setPartner(o);
      this.partner = "";
    },
    ...mapMutations([
      "setDelegate",
      "removeDelegate",
      "setOwner",
      "setPartner",
    ]),
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
