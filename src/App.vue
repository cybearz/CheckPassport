<template>
	<v-app>
		<AppBar :value="profileName"/>

		<v-main>
			<v-container class="py-16 fill-height">
				<router-view
					:value="profileName"
					@saveProfile="saveProfile"
				/>
			</v-container>
		</v-main>

	</v-app>
</template>

<script>
import { nameShortener } from "@/utils/nameShortener"
import AppBar from "@/components/AppBar";

export default {
	components: {AppBar},
	data: () => ({
		profileName: "Личный кабинет"
	}),

	mounted() {
		if (localStorage.getItem("empProfile")) {
			const fio = this.profileName = JSON.parse(localStorage.getItem("empProfile"))["fio"]
			this.profileName = nameShortener(fio)
		}
	},
	methods: {
		saveProfile(fio) {
			this.profileName = nameShortener(fio)
		}
	}
}

</script>
