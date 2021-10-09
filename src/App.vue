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
		<TheSnackbar
			v-bind="snackbarAttrs"
			color="red"
		/>
	</v-app>
</template>

<script>
import { reactive } from "@vue/composition-api"
import { getEmpProfile } from "@/utils/api"
import AppBar from "@/components/AppBar"
import MyFooter from "@/components/MyFooter"
import { useSnackbar } from "@/components/useSnackbar"
import TheSnackbar from "@/components/TheSnackbar"

export default {
	name: "App",
	components: { AppBar, MyFooter, TheSnackbar },

	setup() {
		return {
			snackbarAttrs: useSnackbar(reactive({ statusText: "!!!" })),
		}
	},

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
