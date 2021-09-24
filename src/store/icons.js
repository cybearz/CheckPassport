export default {
	state: {
		iconsArr: [],
		iconSize: "400",
		iconColor: "white",
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
		iconsArr(state) {
			return state.iconsArr
		},

		textIconsArr(state) {
			return state.iconsArr.join(',')
		},

		mdiIconArr(state) {
			return state.iconsArr.map(icon => `mdi-${ icon }`)
		},

		iconSize(state) {
			return state.iconSize
		},

		iconColor(state) {
			return state.iconColor
		},

		iconColorTextClass(state) {
			return `${ state.iconColor }--text`
		},

		iconColorsArr(state) {
			return state.iconColorsArr.sort()
		},
	},

	mutations: {
		updateIconsArr(state, iconsArr) {
			state.iconsArr = iconsArr
		},

		pushIconsArr(state, icon) {
			state.iconsArr.push(icon)
		},

		changeIconSize(state, iconSize) {
			state.iconSize = iconSize
		},

		changeIconColor(state, iconColor) {
			state.iconColor = iconColor
		},
	},

}
