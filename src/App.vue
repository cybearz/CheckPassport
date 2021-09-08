<template>
	<v-app>
		<AppBar :value="profileName"/>

		<v-main>
			<v-container class="py-16 fill-height">
				<router-view
					:value="profileName"
					@updateProfileName="updateProfileName"
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
		const empProfile = localStorage.getItem("empProfile")
		if (empProfile) {
			const parsed = JSON.parse(empProfile)
			if (parsed["fio"]) {
				this.profileName = nameShortener(parsed["fio"])
			}
		}
	},
	methods: {
		updateProfileName(fio) {
			this.profileName = fio ? nameShortener(fio) : "Личный кабинет"
		}
	}
}

</script>
