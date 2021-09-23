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
				<v-icon :size="size" :class=color>{{ mdi }}</v-icon>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import PageNotFound from "@/pages/PageNotFound"
import { hasIcon } from "@/utils/api"

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
		mdi: "",
		color: "white--text",
		size: 400,
		isNotFound: false
	}),

	async mounted() {
		this.mdi = `mdi-${ this.icon }`

		if (!await hasIcon(this.icon)) this.isNotFound = true

		const color = this.$route.query?.color
		if (color) this.color = `${ color }--text`

		const size = this.$route.query?.size
		if (size) this.size = size
	},
}
</script>

<style scoped>

</style>
