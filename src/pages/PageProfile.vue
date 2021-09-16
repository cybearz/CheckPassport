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

import { getEmpProfile, setEmpProfile } from "@/utils/api"

export default {
	name: "PageProfile",

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
		const p = getEmpProfile()
		if (p) {
			this.profile = p
			this.$emit("updateProfile", p)
		}
	},

	methods: {
		saveProfile(newEmp) {
			_.assign(this.profile, newEmp)
			this.uploadProfile()
			this.$emit("updateProfile", this.profile)
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
			const p = this.profile
			setEmpProfile(p)
			this.$emit("updateProfile", p)
		},
	}
}
</script>
