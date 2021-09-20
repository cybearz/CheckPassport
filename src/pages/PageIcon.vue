<template>
	<PageNotFound v-if="isNotFound"/>
	<v-row v-else no-gutters justify="center">
		<v-col cols="4" align-self="center">
			<div class="d-flex justify-center">
				<v-icon :size="size" :class=color>{{ mdi }}</v-icon>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import PageNotFound from "@/pages/PageNotFound"

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

		// ====================================================================================

		let response = await fetch("https://pictogrammers.github.io/@mdi/font/6.1.95/")
		let txt = await response.text()
		if(txt.indexOf(`name:"${this.icon}"`) === -1) this.isNotFound = true

		// ====================================================================================

		const color = this.$route.query?.color
		if (color) this.color = `${ color }--text`

		const size = this.$route.query?.size
		if (size) this.size = size
	},
}
</script>

<style scoped>

</style>
