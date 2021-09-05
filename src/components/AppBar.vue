<template>
	<v-app-bar
		app
		dark
	>
		<v-btn
			plain
			@click="$router.push('/')">
			<v-icon size="40">mdi-passport</v-icon>
			<div class="text-h4">CheckPassport</div>
		</v-btn>

		<v-spacer/>

		<v-btn
			@click="$router.push('/profile')"
			outlined
		>
			<v-icon left>mdi-account</v-icon>
			{{ value}}
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			required: true
		}
	},

}
</script>
