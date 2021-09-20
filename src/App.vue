<template>
	<v-app>
		<AppBar :profile="profile"/>

		<v-main>
			<router-view
				@updateProfile="updateProfile"
				:recvProfile="profile"
			/>
		</v-main>

		<Footer/>
	</v-app>
</template>

<script>
import AppBar from "@/components/AppBar"
import Footer from "@/components/Footer"
import { getEmpProfile } from "@/utils/api"

export default {
	name: "App",

	components: { AppBar, Footer },

	data: () => ({
		profile: undefined,
	}),

	created() {
		const p = getEmpProfile()
		this.updateProfile(p)
	},

	methods: {
		updateProfile(p) {
			this.profile = p
		},
	},
}

</script>
