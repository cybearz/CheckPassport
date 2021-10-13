<template>
	<PageNotFound v-if="isNotFound" />
	<v-row
		v-else
		no-gutters
		justify="center"
	>
		<v-col>
			<v-row>
				<v-col
					v-for="(iconsEl, i) in iconsArr"
					:key="i"
				>
					<v-icon
						:size="iconData.size"
						:class="[`${iconData.color}--text`, 'd-flex']"
					>
						{{ `mdi-${ iconsEl }` }}
					</v-icon>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>

import { getMdiIcons, hasIcon } from "@/utils/api"
import PageNotFound from "@/pages/PageNotFound"

export default {
	name: "PageIcon",

	components: {
		PageNotFound,
	},

	props: {
		icon: {
			type: String,
			default: "",
		},
	},

	data() {
		return {
			iconsArr: [],
			isNotFound: false,
		}
	},

	computed: {
		iconData() {
			return this.$store.getters["icons/data"]
		},
	},

	async mounted() {
		await getMdiIcons()

		let iconsArr = []

		for (let icon of this.icon.split(",")) {
			if (!hasIcon(icon)) {
				this.isNotFound = true
				return //^
			}
			iconsArr.push(icon)
		}

		this.iconsArr = iconsArr

		const { size = "400", color = "white" } = this.$route.query || {}
		this.$store.commit("icons/set", {
			icon: iconsArr,
			size,
			color,
		})
	},

}
</script>

<style scoped>
</style>
