<template>
	<v-app-bar
		app
		dark
	>
		<router-link to="/">
			<v-btn
				plain
				>
				<v-icon size="40">mdi-passport</v-icon>
				<div class="text-h4">CheckPassport</div>
			</v-btn>
		</router-link>

		<v-spacer/>
		<router-link to="/profile">
			<v-btn
				outlined
			>
				<v-icon left>mdi-account</v-icon>
				<slot name="profile"></slot>
			</v-btn>
		</router-link>
	</v-app-bar>
</template>

<script>

</script>
