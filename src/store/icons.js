import _ from "lodash"

export default {
	namespaced: true,

	state: {
		iconConfig: {
			icon: "",
			size: "400",
			color: "white",
		},
	},

	getters: {
		iconConfig(state) {
			return _.clone(state.iconConfig)
		},
	},

	mutations: {
		set(state, v) {
			state.iconConfig = v
		},
	},

}
