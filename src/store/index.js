import Vue from "vue"
import Vuex from "vuex"

import empStore from "./empStore"
import icons from "./icons"

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules: {
		empStore, icons
	},
	// strict: true
})
