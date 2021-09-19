<template>
	<v-container class="py-16 fill-height">
		<v-row no-gutters justify="center">
			<v-col cols="4" align-self="center">
				<div class="d-flex justify-center">
					<v-icon size="400" :class=color>{{ mdi }}</v-icon>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import _ from "lodash"

export default {
	name: "PageIcon",

	props: {
		icon: {
			default: ""
		},
	},

	data: () => ({
		mdi: "",
		color: "",
	}),

	mounted() {
		const tmp = _.split(this.icon, '-')
		this.mdi = `mdi-${tmp[0]}`
		if (tmp[1]) this.color = `${tmp[1]}--text`
	}
}
</script>

<style scoped>

</style>
