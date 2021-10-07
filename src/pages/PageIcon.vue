<template>
	<PageNotFound v-if="isNotFound"/>
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
						:size="iconConfig.size"
						:class="[`${iconConfig.color}--text`, 'd-flex']"
					>
						{{ `mdi-${ iconsEl }` }}
					</v-icon>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import { iconStorage, hasIcon } from "@/utils/api"
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
		...mapGetters("icons", [ "iconConfig" ]),
	},

	async mounted() {
		await iconStorage.init()

		const icon = this.icon
		let iconsArr = []

		for (let icon of icon.split(",")) {
			if (!hasIcon(icon)) {
				this.isNotFound = true
				return //^
			}
			iconsArr.push(icon)
		}

		this.iconsArr = iconsArr

		const { size = "400", color = "white" } = this.$route.query || {}
		this.$store.commit("icons/set", {
			icon,
			size,
			color,
		})
	},

}
</script>

<style scoped>
</style>
