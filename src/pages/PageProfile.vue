<template>
	<v-row
		no-gutters
		justify="center"
	>
		<v-col
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<PassportForm
				:value="profileInner"
				:status-text="statusText"
				@saveEmp="saveProfile"
				@removeEmp="removeProfile"
			/>
		</v-col>
	</v-row>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import _ from "lodash"
import { cleanEmp, setEmpProfile } from "@/utils/api"

export default {
	name: "PageProfile",

	components: {
		PassportForm,
	},

	props: {
		profile: {
			type: Object,
			required: true,
		},
	},

	data: () => ({
		profileInner: cleanEmp,
		statusText: "",
	}),

	mounted() {
		if (this.profile) this.profileInner = _.cloneDeep(this.profile)
	},

	methods: {
		saveProfile(newEmp) {
			_.assign(this.profileInner, newEmp)
			this.uploadProfile()
			this.$emit("updateProfile", this.profileInner)
			this.statusText = "Данные сохранены"
		},

		removeProfile() {
			this.profileInner = cleanEmp
			this.uploadProfile()
			this.statusText = "Данные удалены"
		},

		uploadProfile() {
			const p = this.profileInner
			setEmpProfile(p)
			this.$emit("updateProfile", p)
		},
	},

}
</script>
