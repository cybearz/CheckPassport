import Vue from "vue"
import Vuex from "vuex"

import empStore from "@/store/modules/empStore"

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules: {
		empStore
	},
	// strict: true
})
