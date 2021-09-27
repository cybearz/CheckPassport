<template>
	<v-row no-gutters justify="center">
		<v-col
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<PassportForm
				:value="profile"
				:statusText="statusText"
				@saveEmp="saveProfile"
				@removeEmp="removeProfile"
			/>
		</v-col>
	</v-row>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import _ from "lodash"

import { setEmpProfile } from "@/utils/api"

export default {
	name: "PageProfile",

	components: {
		PassportForm,
	},

	props: {
		recvProfile: {
			required: true,
		},
	},

	data: () => ({
		profile: {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
			avatar: {
				icon: "account",
				color: "white"
			}
		},
		statusText: "",
	}),

	mounted() {
		if (this.recvProfile) this.profile = _.cloneDeep(this.recvProfile)
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
				avatar: {
					icon: "account",
					color: "white"
				}
			}
			this.uploadProfile()
			this.statusText = "Данные удалены"
		},

		uploadProfile() {
			const p = this.profile
			setEmpProfile(p)
			this.$emit("updateProfile", p)
		},
	},

}
</script>
