<template>
	<v-container class="py-16 fill-height">
		<v-row no-gutters justify="center">
			<v-col cols="4">
				<PassportForm
					:value="profile"
					:statusText="statusText"
					@saveEmp="saveProfile"
					@removeEmp="removeProfile"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import _ from "lodash"

import { myLocalStorage } from "@/utils/api"

export default {
	components: {
		PassportForm
	},

	data: () => ({
		profile: {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		},
		statusText: "",
	}),

	mounted() {
		const empProfile = myLocalStorage.empProfile
		if (empProfile) {
			this.profile = myLocalStorage.empProfile
			this.$emit('updateNameProfile', this.profile.fio)
		}
	},

	methods: {
		saveProfile(newEmp) {
			_.assign(this.profile, newEmp)
			this.uploadProfile()
			this.$emit('updateNameProfile', this.profile.fio)
			this.statusText = "Данные сохранены"
		},

		removeProfile() {
			this.profile = {
				fio: "",
					pass_ser: "",
					pass_no: "",
					pass_dt: "",
			}
			this.uploadProfile()
			this.statusText = "Данные удалены"
		},

		uploadProfile() {
			myLocalStorage.empProfile = this.profile
			this.$emit('updateNameProfile', this.profile.fio)
		},
	}
}
</script>

