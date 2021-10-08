<template>
	<v-app>
		<AppBar :profile="profile"/>

		<v-main>
			<v-container class="fill-height">
				<router-view
					:profile="profile"
					@updateProfile="updateProfile"
				/>
			</v-container>
		</v-main>

		<MyFooter/>
	</v-app>
</template>

<script>
import { getEmpProfile } from "@/utils/api"
import AppBar from "@/components/AppBar"
import MyFooter from "@/components/MyFooter"

export default {
	name: "App",
	components: { AppBar, MyFooter },

	data() {
		return {
			profile: undefined,
		}
	},

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
