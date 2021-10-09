<template>
	<v-snackbar v-model="snackbar"
		:color="color"
	>
		{{ text }}
		<template v-slot:action="{ attrs }">
			<v-btn
				color="blue"
				text
				v-bind="attrs"
				@click="snackbar = false"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
import { ref } from "@vue/composition-api"
// import { useSnackbar } from "./useSnackbar"

export default {
	name: "TheSnackbar",

	props: {
		text: String,

		timeout: {
			type: [ String, Number ],
			default: 2500,
		},

		color: {
			type: String,
			default: "green",
		},
	},

	setup() {
		return {
			snackbar: ref(false),
		}
	},
}
</script>

<style scoped>

</style>
