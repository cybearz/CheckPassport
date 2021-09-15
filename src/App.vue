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
import { myLocalStorage } from "@/utils/api"

import AppBar from "@/components/AppBar"

export default {
	components: {AppBar},
	data: () => ({
		nameProfile: "Личный кабинет"
	}),

	mounted() {
		if (myLocalStorage.empProfile) {
			if (myLocalStorage.empProfile.fio) {
				this.nameProfile = nameShortener(myLocalStorage.empProfile.fio)
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
