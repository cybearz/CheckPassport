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
						{{ `mdi-${ icon }` }}
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

		const { size = "400", color = "white" } = this.$route.query || {}
		this.updatedIconConfig({
			textIcons: this.icon,
			size,
			color,
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
