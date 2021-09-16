<template>
	<v-container class="py-16 fill-height">
		<v-row no-gutters justify="center">
			<v-col
				cols="3"
			>
				<EmpList/>
			</v-col>
			<v-col
				cols="4"
			>
				<PassportForm
					:value="employee"
					:btn="isBtnDisabled"
					:statusText="statusText"
					@saveEmp="saveEmp($event)"
					@removeEmp="removeEmp"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import EmpList from "@/components/EmpList"

import _ from "lodash"
import { mapActions, mapGetters, mapMutations } from "vuex"
import { v1 as uuidv1 } from "uuid"

import { getEmpStore } from "@/utils/api"

export default {
	name: "PageMain",

	props: {
		urlId: {
			type: String,
			default: ""
		}
	},

	components: {
		PassportForm, EmpList
	},

	data: () => ({
		isBtnDisabled: false,
		empId: "",
		statusText: "",
	}),

	beforeRouteEnter(to, from, next) {
		const s = getEmpStore()
		if (to.name === "empPassport" && s) {
			if (_.find(s, (v, k) => to.params.urlId === k)) {
				next()
			} else {
				next({name: "notFound"})
			}
		}
		next()
	},

	mounted() {
		this.empId = this.urlId
		this.downloadEmpStore()
		this.addNamesAndIds()
	},

	methods: {
		...mapActions(["downloadEmpStore", "uploadEmpStore", "addNamesAndIds"]),
		...mapMutations(["clearEmp", "updateEmp", "pushNamesAndIds", "changeEmpStore", "changeNamesAndIds", "deleteEmpStoreKey", "deleteNamesAndIdsEl"]),

		saveEmp(newEmp) {
			if (!this.empId && this.findEmpByName(newEmp.fio) !== -1) {
				this.statusText = "ОШИБКА: Пользователь с таким именем уже существует"
				return
			} else {
				this.statusText = "Данные сохранены"
			}

			if (!this.empId) {
				this.empId = uuidv1()
				this.addNamesAndIds([newEmp.fio, this.empId])
			} else {
				const oldFio = this.employee.fio

				if (newEmp.fio !== oldFio) {
					const ind = this.findEmpById(this.empId)

					this.changeNamesAndIds({ind, newFullname: newEmp.fio})
				}
			}

			this.updateEmp(newEmp)
			this.changeEmpStore({id: this.empId, newEmp})
			this.uploadEmpStore()
		},

		removeEmp() {
			this.statusText = "Данные удалены"
			const empStoreId = this.empId

			if (this.empStore[empStoreId]) {
				this.deleteEmpStoreKey(empStoreId)
				const ind = this.findEmpById(empStoreId)

				this.deleteNamesAndIdsEl(ind)
				this.empId = ""
			}

			this.uploadEmpStore()
			this.clearEmp()
		},

		findEmpById(id) {
			return _.findIndex(this.namesAndIds, el => el[1] === id)
		},

		findEmpByName(name) {
			return _.findIndex(this.namesAndIds, el => el[0] === name)
		}

	},

	computed: {
		...mapGetters(["empStore", "namesAndIds", "employee"])
	},

	watch: {
		empId(newEmpId) {
			if (this.empId) {
				this.updateEmp(this.empStore[newEmpId])
			} else {
				this.clearEmp()
			}
		},

		urlId(newUrlId) {
			if (newUrlId && this.findEmpById(newUrlId) !== -1) {
				this.isBtnDisabled = true
				this.empId = newUrlId
			} else {
				this.empId = ""
				this.isBtnDisabled = false
			}
		}
	}
}
</script>
