<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
		>
			<div class="d-flex align-center">
				<v-icon size="40">mdi-passport</v-icon>
				<div class="text-h4">CheckPassport</div>
			</div>

			<v-spacer></v-spacer>

			<v-btn>
				<v-icon left>mdi-account</v-icon>
				Личный кабинет
			</v-btn>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>

	</v-app>
</template>

<script>

</script>
