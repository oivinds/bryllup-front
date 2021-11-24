<template lang="pug">
v-container.my-8
	v-row.py-2(justify="center")
		v-col(cols="12" sm="11" md="10" lg="9")
			v-card.pa-8.justify-center(shaped class="rounded-xl")
				v-card-title.justify-center.headline Velkommen til  bryllupsplanleggeren {{ owner }} {{ andText }}  {{  partner}}
				v-card-text.body-1 
					li Start med å skrive inn navnene på brudeparet
					li Sett bryllupsdatoen
				v-card-actions
					v-btn(x-large to="/todo" color="primary") todo listen. 
						v-icon mdi-ray-start-arrow 
	v-row(justify="center")
		v-col(cols="12"  sm="7" md="7" lg="6")
			v-card.justify-center(  rounded class="rounded-xl")
				v-col.px-8(cols="12" align-self="center")
					v-card-title.title Hva er Brudeparets navn?
					v-card-actions
						v-text-field(  placeholder="Skriv ditt fornavn" label="meg" v-model="ownerLocal")
						v-card-actions
							v-btn.mx-auto(@click="setOwnerLocal(ownerLocal)" color="primary" ) legg til
						v-text-field( placeholder="Skriv fornavn" label="brudgom / brud" v-model="partnerLocal")
						v-card-actions
							v-btn.mx-auto(@click="setPartnerLocal(partnerLocal)" color="primary" ) legg til
		v-col(cols="12" sm="4" md="3" lg="3")
			v-card.justify-center(  rounded class="rounded-xl" )
				v-col.px-8(cols="12" align-self="center")
					v-card-title.title Bryllupsdato
					v-card-actions
						DatePicker
		//- v-col(cols="12" sm="11" md="3")
		//- 	v-card.justify-center(  rounded class="rounded-xl")
		//- 		v-col.px-8(cols="12" align-self="center")
		//- 			v-card-title.title Legg til ansvarlige
		//- 			v-card-actions
		//- 				v-text-field.shrink( placeholder="legg til person" label="ansvarlig" v-model="delegate")
		//- 				v-btn.mx-auto(@click="setDel(delegate)" color="primary" ) legg til
		
		//- v-col(cols="12" md="6")
		//- 	v-card( rounded class="rounded-xl" v-if="owner || partner || delegates.length")
		//- 		v-col.px-8(cols="12" align-self="center")
		//- 			v-card-title.title Personer / ansvarlige
		//- 			v-card-actions.justify-center
		//- 				transition-group(name="list-complete" )
		//- 					v-chip.ma-2.pa-3.justify-center(v-if="owner" key="0" class="list-complete-item"  
		//- 					dark color="deep-orange" label) {{ owner}}
		//- 					v-chip.ma-2.pa-3.justify-center(v-if="partner"  key="1" class="list-complete-item"  
		//- 					dark color="blue" label) {{ partner}}
		//- 					v-chip.ma-2.pa-3.justify-center(v-for="item in delegates" :key="item" @click:close="removeDelegate(item)" 
		//- 					close 
		//- 					dark color="tertiary" label
		//- 					class="list-complete-item" 
		//- 					) {{ item}}
					
</template>

<script>
import DatePicker from "../components/DatePicker";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      delegate: "",
      ownerLocal: "",
      partnerLocal: "",
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
      this.ownerLocal = "";
    },
    setPartnerLocal(o) {
      this.setPartner(o);
      this.partnerLocal = "";
    },
    ...mapMutations([
      "setDelegate",
      "removeDelegate",
      "setOwner",
      "setPartner",
    ]),
  },
  computed: {
    andText() {
      if (this.partner && this.owner) {
        return "og";
      }
      return "";
    },
    ...mapState([
      "owner",
      "partner",
      "editBool",
      "timeBeforeWedding",
      "delegates",
    ]),
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
