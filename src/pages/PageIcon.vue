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
					v-for="(icon, i) in mdiArr"
					:key="i"
					:size="size"
					:class=iconColor
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
		PageNotFound
	},

	data: () => ({
		isNotFound: false
	}),

	async mounted() {
		await iconStorage.init()
		this.clearIconsArr()
		if (this.$route.name === "PageIcon") {
			for (let icon of this.icon.split(",")) {
				console.log(icon)
				if (!await hasIcon(icon)) {
					this.isNotFound = true
					return //^
				}
				this.pushIcon(icon)
			}
		} else {
			if (!await hasIcon(this.icon)) {
				this.isNotFound = true
				return //^
			}
			this.changeIcon(this.icon)
			this.pushIcon(this.icon)
		}

		const size = this.$route.query?.size
		if (size) this.changeSize(size)

		const color = this.$route.query?.color
		if (color) this.changeColor(`${ color }--text`)
	},

	methods: {
		...mapMutations(["changeIcon", "pushIcon", "clearIconsArr", "changeSize", "changeColor"])
	},

	computed: {
		...mapGetters([ "mdi", "mdiArr", "size", "iconColor" ])
	}
}
</script>

<style scoped>

</style>
