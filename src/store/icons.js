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
			return state.iconConfig
		},

		iconColorsArr(state) {
			return state.iconColorsArr.sort()
		},
	},

	mutations: {
		updatedIconConfig(state, v) {
			state.iconConfig = _.clone(v)
		},
	},

}
