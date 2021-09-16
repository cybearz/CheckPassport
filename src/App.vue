<template>
	<v-app>
		<AppBar
			:profile="profile"
		/>
		<v-main>
			<router-view
				@updateNameProfile="updateNameProfile"
			/>
		</v-main>

	</v-app>
</template>

<script>
import { myLocalStorage } from "@/utils/api"

import AppBar from "@/components/AppBar"

export default {
	components: { AppBar },

	data: () => ({
		profile: undefined,
	}),

	mounted() {
		const p = myLocalStorage.empProfile
		if (p) {
			if (p.fio) {
				this.profile = p
			}
		}
	},

	methods: {
		updateNameProfile(fio) {
			this.profile = { fio }
		},
	},
}

</script>
