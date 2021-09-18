<template>
	<v-container class="py-16 fill-height">
		<v-row no-gutters justify="center">
			<v-col cols="4" align-self="center">
				<div class="d-flex justify-center">
					<v-icon size="400" :class=iconClass>{{ mdi }}</v-icon>
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
			default: ""
		},
		color: {
			default: ""
		}
	},

	data: () => ({
		mdi: ""
	}),

	mounted() {
		this.mdi = `mdi-${this.icon}`
	},

	computed: {
		iconClass() {
			return `${this.color}--text`
		}
	}
}
</script>

<style scoped>

</style>
