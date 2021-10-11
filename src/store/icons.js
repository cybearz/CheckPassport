import _ from "lodash"

export default {
	namespaced: true,

	state: {
		icon: [],
		size: "400",
		color: "white",
	},

	getters: {
		data(state) {
			return _.cloneDeep(state)
		},
	},

	mutations: {
		set(state, v) {
			_.assign(state, v)
		},
	},

}
