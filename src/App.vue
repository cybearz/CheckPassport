<template>
	<v-app>
		<AppBar>
			<template #profile>
				{{ nameProfile }}
			</template>
		</AppBar>
		<v-main>
				<router-view
					:value="nameProfile"
					@updateNameProfile="updateNameProfile"
				/>
		</v-main>

	</v-app>
</template>

<script>
import { nameShortener } from "@/utils/nameShortener"
import AppBar from "@/components/AppBar";

export default {
	components: {AppBar},
	data: () => ({
		nameProfile: "Личный кабинет"
	}),

	mounted() {
		const empProfile = localStorage.getItem("empProfile")
		if (empProfile) {
			const parsed = JSON.parse(empProfile)
			if (parsed["fio"]) {
				this.nameProfile = nameShortener(parsed["fio"])
			}
		}
	},
	methods: {
		updateNameProfile(fio) {
			this.nameProfile = fio ? nameShortener(fio) : "Личный кабинет"
		}
	}
}

</script>
