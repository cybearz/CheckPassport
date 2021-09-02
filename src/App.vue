<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
		>
			<div class="d-flex align-center">
				<v-icon size="40">mdi-passport</v-icon>
				<div class="text-h4">CheckPassport</div>
			</div>
		</v-app-bar>

		<v-main>
			<v-container class="blue-grey lighten-5 py-16 fill-height">
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
							:formVisible="formVisible"
							:saveBtnVisible="saveBtnVisible"
							:employee="employee"
							@input="inputChange"
							@saveEmp="saveEmp"
							@removeEmp="removeEmp"
							@focus="saveBtnVisible = true"
						/>
					</v-col>
				</v-row>

			</v-container>
		</v-main>

	</v-app>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {v1 as uuidv1} from 'uuid';

import PassportForm from "@/components/PassportForm"
import EmpList from "@/components/EmpList"

export default {
	name: 'App',

	components: {
		PassportForm, EmpList
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

	methods: {
		addEmp() {
			this.empId = ""
		},

		inputChange(key, txt) {
			if (key === "pass_dt") {
				txt = moment(txt).format("YYYY-MM-DDThh:mm:ssZ")
			}
			this.employee[key] = txt
			// const tmp = this.empStore[this.empId]
			// if (_.isEqual(this.employee, tmp)) {
			//   this.saveBtnVisible = false
			// } else {
			//   this.saveBtnVisible = true
			// }
		},

		saveEmp() {
			_.forIn(this.employee, (value, key) => {
				this.employee[key] = _.trim(_.replace(value, /\s+/g, ' '))
			})
			if (!this.empId) {
				const empStoreId = uuidv1()

				this.empId = empStoreId
				this.namesAndIds.push([this.employee["fio"], empStoreId])
			} else {
				const oldFio = this.empStore[this.empId]["fio"]

				if (this.empId && this.employee["fio"] !== oldFio) {
					_.forEach(this.namesAndIds, (value, ind) => {
						if (value[1] === this.empId) {
							this.namesAndIds[ind].splice(0, 1, this.employee["fio"])
						}
					})
				}
			}

			this.empStore[this.empId] = _.assign({}, this.employee)
			this.saveBtnVisible = false
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
};
</script>
