<template>
	<v-row no-gutters justify="center">
		<v-col cols="4">
			<PassportForm
				:value="profile"
				@saveEmp="saveProfile"
				@removeEmp="removeProfile"
			/>
		</v-col>
	</v-row>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import _ from "lodash"

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
	}),

	mounted() {
		//FIXME
		const empProfile = localStorage.getItem("empProfile")
		if (empProfile) {
			this.profile = JSON.parse(empProfile)
			this.$emit('updateProfileName', this.profile.fio)
		}
	},

	methods: {
		saveProfile(newEmp) {
			_.assign(this.profile, newEmp)
			this.uploadProfile()
			this.$emit('updateProfileName', this.profile.fio)
		},

		removeProfile() {
			this.profile = {
				fio: "",
					pass_ser: "",
					pass_no: "",
					pass_dt: "",
			}
			this.uploadProfile()
		},

		uploadProfile() {
			const parsed = JSON.stringify(this.profile)
			localStorage.setItem("empProfile", parsed)
			this.$emit('updateProfileName', this.profile.fio)
		},
	}
}
</script>
