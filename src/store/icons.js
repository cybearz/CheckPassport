export default {
	state: {
		icon: "",
		size: "400",
		color: "white",
		libColors: [
			"red", "pink", "purple", "deep-purple",
			"indigo", "blue", "light-blue", "cyan",
			"teal", "green", "light-green", "lime",
			"yellow", "amber", "orange", "deep-orange",
			"brown", "blue-grey", "grey", "black",
			"white",
		],
	},

	getters: {
		icon(state) {
			return state.icon
		},

		mdi(state) {
			return `mdi-${ state.icon }`
		},

		size(state) {
			return state.size
		},

		color(state) {
			return state.color
		},

		libColors(state) {
			return state.libColors.sort((curr, next) => curr > next)
		}
	},

	mutations: {
		changeIcon(state, icon) {
			state.icon = icon
		},

		changeSize(state, size) {
			state.size = size
		},

		changeColor(state, color) {
			state.color = color
		}
	}

}
