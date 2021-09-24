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
					v-for="(icon, i) in iconsArr"
					:key="i"
					:size="iconConfig.size"
					:class="`${iconConfig.color}--text`"
				>
					{{ `mdi-${icon}` }}
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
		iconsArr: [],
		isNotFound: false,
	}),

	async mounted() {
		if (this.$route.params.icon === "show-icon") {
			this.iconsArr = this.iconConfig.textIcons.split(",")
			return //^
		}
		await iconStorage.init()

		let iconsArr = []

		for (let icon of this.icon.split(",")) {
			if (!await hasIcon(icon)) {
				this.isNotFound = true
				return //^
			}
			iconsArr.push(icon)
		}

		this.iconsArr = iconsArr

		const iconSize = this.$route.query?.size
		const iconColor = this.$route.query?.color

		this.updatedIconConfig({
			textIcons: this.icon,
			size: iconSize ? iconSize : "400",
			color: iconColor ? iconColor :"white",
		})
	},

	methods: {
		...mapMutations([ "updatedIconConfig" ]),
	},

	computed: {
		...mapGetters([ "iconConfig" ]),
	},
}
</script>

<style scoped>

</style>
