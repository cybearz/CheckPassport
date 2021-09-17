<template>
	<v-container class="py-16 fill-height">
		<v-row no-gutters justify="center">
			<v-col cols="4" align-self="center">
				<div class="d-flex justify-center">
					<v-icon size="400">{{ mdi }}</v-icon>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "PageIcon",

	props: {
		icon: {
			type: String,
			default: ""
		}
	},

	data: () => ({
		mdi: ""
	}),

	mounted() {
		this.mdi = `mdi-${this.icon}`
	}
}
</script>

<style scoped>

</style>
