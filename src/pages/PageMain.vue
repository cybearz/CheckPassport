<template>
	<v-row no-gutters justify="center">
		<v-col
			cols="3"
		>
			<EmpList
				:namesAndIds="namesAndIds"
				@addEmp="empId = ''"
				@showPassport="empId = $event"
			/>
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
</template>

<script>
import _ from 'lodash'
import {v1 as uuidv1} from 'uuid';

import PassportForm from "@/components/PassportForm"
import EmpList from "@/components/EmpList"

export default {
	name: 'App',
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
		namesAndIds: [],
		empStore: {},
		employee: {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		},
		statusText: "",
	}),

	created() {
		if (this.urlId && _.findIndex(this.namesAndIds, el => el[1] === this.urlId)) {
			this.empId = this.urlId
		}
	},

	mounted() {
		if (localStorage.getItem("empStore")) {
			this.empStore = JSON.parse(localStorage.getItem("empStore"))

			_.forEach(this.empStore, (value, id) => {
				this.namesAndIds.push([value["fio"], id])
			})
		}
	},

	methods: {
		addEmp() {
			this.empId = ""
		},

		saveEmp(newEmp) {
			if (this.findEmpByName(newEmp["fio"]) !== -1) {
				this.statusText = "ОШИБКА: Пользователь с таким именем уже существует"
				return
			}
			const ind = this.findEmpById(this.empId)
			if (!this.empId || ind == -1) {
				const empStoreId = uuidv1()

				this.empId = empStoreId
				this.namesAndIds.push([newEmp["fio"], empStoreId])
			} else {
				const oldFio = this.employee["fio"]

				if (this.empId && newEmp["fio"] !== oldFio) {
					this.namesAndIds[ind].splice(0, 1, newEmp["fio"])
				}
			}

			this.empStore[this.empId] = _.assign({}, newEmp)
			this.uploadEmpStore()
		},

		removeEmp() {
			const empStoreId = this.empId

			if (this.empStore[empStoreId]) {
				delete this.empStore[empStoreId]
				let ind
				_.forEach(this.namesAndIds, (value, idx) => {
					if (value[1] === empStoreId) {
						ind = idx
					}
				})

				this.namesAndIds.splice(ind, 1)
				this.empId = ""
			}

			this.uploadEmpStore()
			this.clearEmp()
		},

		clearEmp() {
			this.employee = {
				fio: "",
				pass_ser: "",
				pass_no: "",
				pass_dt: "",
			}
		},

		uploadEmpStore() {
			const parsed = JSON.stringify(this.empStore)
			localStorage.setItem("empStore", parsed)
		},

		findEmpById(id) {
			return _.findIndex(this.namesAndIds, el => el[1] === id)
		},

		findEmpByName(name) {
			return _.findIndex(this.namesAndIds, el => el[0] === name)
		}
	},

	watch: {
		empId(newEmpId) {
			if (this.empId) {
				_.assign(this.employee, this.empStore[newEmpId])
				this.isBtnDisabled = true
			} else {
				this.clearEmp()
				this.isBtnDisabled = false
			}

			if (newEmpId !== this.urlId) {
				this.$router.push(`/${newEmpId}`)
			}
		},

		urlId(newUrlId) {
			if (this.empId !== newUrlId) {
				if (newUrlId && this.findEmpById(newUrlId) === -1) {
					this.empId = ""
				} else {
					this.empId = newUrlId
				}
			}
		}
	}
}
</script>
