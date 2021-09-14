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
		downloadEmpStore(state, newEmpStore) {
			state.empStore = newEmpStore
		},

		changeEmpStore(state, {id, newEmp}) {
			state.empStore[id] = _.assign({}, newEmp)
		},

		deleteEmpStoreKey(state, empStoreId) {
			delete state.empStore[empStoreId]
		},

		updateNamesAndIds(state) {
			_.forEach(state.empStore, (value, id) => {
				state.namesAndIds.push([value.fio, id])
			})
		},

		pushNamesAndIds(state, newVal) {
			state.namesAndIds.push(newVal)
		},

		changeNamesAndIds(state, {ind, newFullname}) {
			state.namesAndIds[ind].splice(0, 1, newFullname)
		},

		deleteNamesAndIdsEl(state, ind) {
			state.namesAndIds.splice(ind, 1)
		},

		updateEmp(state, newEmp) {
			state.employee = newEmp
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
		downloadEmpStore(ctx) {
			if (localStorage.getItem("empStore")) {
				const empStore = JSON.parse(localStorage.getItem("empStore"))

				ctx.commit("downloadEmpStore", empStore)
			}
		},

		uploadEmpStore(ctx) {
			const parsed = JSON.stringify(ctx.getters.empStore)
			localStorage.setItem("empStore", parsed)
		},

	},
}
