<template>
	<v-app>
		<AppBar :profile="profile"/>

		<v-main>
			<v-container class="fill-height">
				<router-view
					@updateProfile="updateProfile"
					:recvProfile="profile"
				/>
			</v-container>
		</v-main>

		<MyFooter/>
	</v-app>
</template>

<script>
import AppBar from "@/components/AppBar"
import MyFooter from "@/components/MyFooter"
import { init, getEmpProfile } from "@/utils/api"

export default {
	name: "App",

	components: { AppBar, MyFooter },

	data: () => ({
		profile: undefined,
	}),

	created() {
		init()
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
