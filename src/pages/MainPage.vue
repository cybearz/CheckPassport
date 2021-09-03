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
				:btn="saveBtnVisible"
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

	components: {
		PassportForm, EmpList
	},

	data: () => ({
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

	methods: {
		addEmp() {
			this.empId = ""
		},

		saveEmp(newEmp) {
			if (!this.empId || this.findEmpById(this.empId) == -1) {
				const empStoreId = uuidv1()

				this.empId = empStoreId
				this.namesAndIds.push([newEmp["fio"], empStoreId])
			} else {
				const oldFio = this.empStore[this.empId]["fio"]

				if (this.empId && newEmp["fio"] !== oldFio) {
					_.forEach(this.namesAndIds, (value, ind) => {
						if (value[1] === this.empId) {
							this.namesAndIds[ind].splice(0, 1, newEmp["fio"])
						}
					})
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
		}
	},

	watch: {
		empId(newId) {
			if (this.empId) {
				_.assign(this.employee, this.empStore[newId])
				this.saveBtnVisible = false
			} else {
				this.clearEmp()
				this.saveBtnVisible = true
			}

			const urlId = this.$route.params.id ? this.$route.params.id : ""

			if (newId !== urlId) {
				this.$router.push(`/${newId}`)
			}
		},

		$route(to) {
			let urlId = to.params.id ? to.params.id : ""

			if (urlId !== this.empId) {
				if (urlId && this.findEmpById(urlId) === -1) {
					urlId = ""
				}

				this.empId = urlId
			}
		}
	}
}
</script>
