<template>
	<PageNotFound v-if="isNotFound"/>
	<v-row v-else no-gutters justify="center">
		<v-col
			align-self="center"
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<div class="d-flex justify-center">
				<v-icon
					v-for="(icon, i) in mdiIconArr"
					:key="i"
					:size="iconSize"
					:class="iconColorTextClass"
				>
					{{ icon }}
				</v-icon>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import PageNotFound from "@/pages/PageNotFound"

import { mapGetters, mapMutations } from "vuex"

import { iconStorage, hasIcon } from "@/utils/api"

export default {
	name: "PageIcon",

	props: {
		icon: {
			default: "",
		},
	},

	components: {
		PageNotFound,
	},

	data: () => ({
		isNotFound: false,
	}),

	async mounted() {
		await iconStorage.init()

		let iconsArr = []

		for (let icon of this.icon.split(",")) {
			if (!await hasIcon(icon)) {
				this.isNotFound = true
				return //^
			}
			iconsArr.push(icon)
		}

		this.updateIconsArr(iconsArr)

		const iconSize = this.$route.query?.size
		if (iconSize) this.changeIconSize(iconSize)

		const iconColor = this.$route.query?.color
		if (iconColor) this.changeIconColor(iconColor)
	},

	methods: {
		...mapMutations([ "updateIconsArr", "changeIconSize", "changeIconColor"]),
	},

	computed: {
		...mapGetters([ "mdiIconArr", "iconSize", "iconColorTextClass" ]),
	},
}
</script>

<style scoped>

</style>
