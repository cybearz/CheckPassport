<template>
	<PageNotFound v-if="isNotFound"/>
	<v-row v-else no-gutters justify="center">
		<v-col>
			<v-row>
				<v-col
					v-for="(icon, i) in iconsArr"
					:key="i"
				>
					<v-icon
						:size="iconConfig.size"
						:class="[`${iconConfig.color}--text`, 'd-flex']"
					>
						{{ `mdi-${icon}` }}
					</v-icon>
				</v-col>
			</v-row>
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
