<template>
	<v-app-bar app dark>
		<router-link
			style="text-decoration: none; color: inherit;"
			:to="{ name: 'main' }"
		>
			<v-btn plain>
				<v-icon size="40">mdi-passport</v-icon>
				<div class="text-h4">CheckPassport</div>
			</v-btn>
		</router-link>

		<v-spacer/>

		<router-link
			style="text-decoration: none; color: inherit;"
			:to="{ name: 'profile' }"
		>
			<v-btn outlined>
				<v-icon left>mdi-account</v-icon>
				{{ login }}
			</v-btn>
		</router-link>
	</v-app-bar>
</template>

<script>
import { getShortName } from "@/utils/getShortName"

export default {
	name: "AppBar",

	props: {
		profile: Object,
	},

	computed: {
		login() {
			const fio = this.profile?.fio
			return fio ? getShortName(fio) : "Личный кабинет"
		},
	},
}

</script>
