<template>
	<v-app>
		<AppBar :profile="profile"/>
		<v-main>
			<router-view
				@updateProfile="updateProfile"
			/>
		</v-main>

	</v-app>
</template>

<script>
import { myLocalStorage } from "@/utils/api"
import AppBar from "@/components/AppBar"

export default {
	name: "App",

	components: { AppBar },

	data: () => ({
		profile: undefined,
	}),

	mounted() {
		this.updateProfile(myLocalStorage.empProfile)
	},

	methods: {
		updateProfile(p) {
			this.profile = p
		},
	},
}

</script>
