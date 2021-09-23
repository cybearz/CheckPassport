export default {
	state: {
		icon: "",
		iconsArr: [],
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

		mdiArr(state) {
			return state.iconsArr.map(icon => `mdi-${ icon }`)
		},

		size(state) {
			return state.size
		},

		color(state) {
			return state.color
		},

		iconColor(state) {
			return `${state.color}--text`
		},

		libColors(state) {
			return state.libColors.sort((curr, next) => curr > next)
		}
	},

	mutations: {
		changeIcon(state, icon) {
			state.icon = icon
		},

		pushIcon(state, icon) {
			state.iconsArr.push(icon)
		},

		clearIconsArr(state) {
			state.iconsArr = []
		},

		changeSize(state, size) {
			state.size = size
		},

		changeColor(state, color) {
			state.color = color
		}
	}

}
