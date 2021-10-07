import _ from "lodash"

import { getShortName } from "@/utils/getShortName"

export default {
	namespaced: true,

	state: {
		empList: [],
	},

	getters: {
		empList(state) {
			return state.empList
		},

		sortedEmpList(state) {
			let sortedEmpList = _.cloneDeep(state.empList).sort((curr, next) => curr.fullName?.localeCompare(next.fullName))
			_.forEach(sortedEmpList, value => {
				value.fullName = getShortName(value.fullName)
			})
			return sortedEmpList
		},
	},

	mutations: {

		set(state, v) {
			state.empList = _.cloneDeep(v)
		},

		pushEmpList(state, v) {
			state.empList.push(v)
		},

		setEmpListEl(state, { ind, key, value }) {
			state.empList[ind][key] = value
		},

		remove(state, ind) {
			state.empList.splice(ind, 1)
		},
	},
}
