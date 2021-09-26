import _ from "lodash"

export default {
	state: {
		iconConfig: {
			icon: "",
			size: "400",
			color: "white",
		},

		iconColorsArr: [
			"red", "pink", "purple", "deep-purple",
			"indigo", "blue", "light-blue", "cyan",
			"teal", "green", "light-green", "lime",
			"yellow", "amber", "orange", "deep-orange",
			"brown", "blue-grey", "grey", "black",
			"white",
		],

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
