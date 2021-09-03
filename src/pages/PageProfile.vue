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
import _ from "lodash";

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
		if (localStorage.getItem("empProfile")) {
			this.profile = JSON.parse(localStorage.getItem("empProfile"))
		}
	},

	methods: {
		saveProfile(newEmp) {
			_.assign(this.profile, newEmp)
			this.uploadProfile()
			this.$emit('saveProfile', this.profile.fio)
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
		},
	}
}
</script>
