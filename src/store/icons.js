import _ from "lodash"

export default {
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
		updatedIconConfig(state, v) {
			state.iconConfig = v
		},
	},

}
