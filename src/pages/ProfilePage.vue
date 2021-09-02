<template>
	<div>
		<PassportForm
			:saveBtnVisible="saveBtnVisible"
			:employee="employee"
			@input="inputChange"
			@saveEmp="saveEmp"
			@removeEmp="removeEmp"
			@focus="saveBtnVisible = true"
		/>
	</div>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import _ from "lodash";

export default {
	components: {
		PassportForm
	},
	data: () => ({
		formVisible: false,
		saveBtnVisible: true,
		empId: "",
		namesAndIds: [],
		empStore: {},
		employee: {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		},
	}),

	created() {
		const urlId = this.$route.params.id
		if (urlId && _.findIndex(this.namesAndIds, el => el[1] === urlId)) {
			this.empId = urlId
		}
	},

	mounted() {
		if (localStorage.getItem("empStore")) {
			this.empStore = JSON.parse(localStorage.getItem("empStore"))

			_.forEach(this.empStore, (value, ID) => {
				this.namesAndIds.push([value["fio"], ID])
			})
		}
	},
}
</script>
