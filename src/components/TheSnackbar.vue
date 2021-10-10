<template>
	<v-snackbar
		:value="value"
		:color="color"
		@input="b => $emit('input', b)"
	>
		{{ text }}
		<template v-slot:action="{ attrs }">
			<v-btn
				color="white"
				text
				v-bind="attrs"
				@click="$emit('input', false)"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
export default {
	name: "TheSnackbar",

	props: {
		value: Boolean,
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

}
</script>

<style scoped>

</style>
