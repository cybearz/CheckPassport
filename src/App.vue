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

			<v-btn
				@click="$router.push('/profile')"
			>
				<v-icon left>mdi-account</v-icon>
				{{ profileName }}
			</v-btn>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>

	</v-app>
</template>

<script>

export default {

	data: () => ({
		profileName: "Личный кабинет"
	}),

	mounted() {
		if (localStorage.getItem("empProfile")) {
			const fio = this.profileName = JSON.parse(localStorage.getItem("empProfile"))["fio"]
			let [surname, name, midName] = fio.split(" ")
			surname = surname.toLowerCase()
			surname = surname[0].toUpperCase() + surname.slice(1)
			this.profileName = `${surname} ${name[0].toUpperCase()}. ${midName[0].toUpperCase()}.`
		}
	},
}

</script>
