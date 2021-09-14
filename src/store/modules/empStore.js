import _ from "lodash"

import { nameShortener } from "@/utils/nameShortener"

export default {
	state: {
		empStore: {},
		namesAndIds: [],
		employee: {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		},
	},

	getters: {
		empStore(state) {
			return state.empStore
		},

		namesAndIds(state) {
			return state.namesAndIds
		},

		sortedNamesAndIds(state) {
			let sortedNamesAndIds = _.cloneDeep(state.namesAndIds).sort((curr, next) => curr[0]?.localeCompare(next[0]))
			_.forEach(sortedNamesAndIds, value => {
				value[0] = nameShortener(value[0])
			})
			return sortedNamesAndIds
		},

		employee(state) {
			return state.employee
		}
	},

	mutations: {
		updateEmpStore(state, newEmpStore) {
			console.log("updateEmpStore", newEmpStore)

			state.empStore = newEmpStore
		},

		changeEmpStore(state, {id, newEmp}) {
			console.log("changeEmpStore", newEmp.fio)
			state.empStore[id] = _.assign({}, newEmp)
		},

		updateNamesAndIds(state) {
			_.forEach(state.empStore, (value, id) => {
				state.namesAndIds.push([value.fio, id])
			})
		},

		pushNamesAndIds(state, newVal) {
			state.namesAndIds.push(newVal)
		},

		updateEmp(state, newEmp) {
			state.employee = newEmp
			console.log("updateEmp", newEmp)
		},

		clearEmp(state) {
			state.employee = {
				fio: "",
				pass_ser: "",
				pass_no: "",
				pass_dt: "",
			}
		},
	},

	actions: {
		updateEmpStore(ctx) {
			if (localStorage.getItem("empStore")) {
				const empStore = JSON.parse(localStorage.getItem("empStore"))

				ctx.commit("updateEmpStore", empStore)
			}
		},

		uploadEmpStore(ctx) {
			const parsed = JSON.stringify(ctx.getters.empStore)

			console.log("uploadEmpStore", parsed)
			localStorage.setItem("empStore", parsed)
		},

	},
}
