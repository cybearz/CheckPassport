<template>
	<v-row no-gutters justify="center">
		<v-col cols="4" align-self="center">
			<div class="d-flex justify-center">
				<v-icon :size="size" :class=color>{{ mdi }}</v-icon>
			</div>
		</v-col>
	</v-row>
</template>

<script>

export default {
	name: "PageIcon",

	props: {
		icon: {
			default: "",
		},
	},

	data: () => ({
		mdi: "",
		color: "white--text",
		size: 400
	}),

	mounted() {
		this.mdi = `mdi-${ this.icon }`

		const color = this.$route.query?.color
		if (color) this.color = `${ color }--text`

		const size = this.$route.query?.size
		if (size) this.size = size
	},
}
</script>

<style scoped>

</style>
