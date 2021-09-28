import _ from "lodash"

import { getShortName } from "@/utils/getShortName"
import { cleanEmp } from "@/utils/api"

export default {
	state: {
		empListArr: [],
		employee: cleanEmp,
	},

	getters: {
		empListArr(state) {
			return state.empListArr
		},

		sortedNamesAndIds(state) {
			let sortedNamesAndIds = _.cloneDeep(state.empListArr).sort((curr, next) => curr.fullName?.localeCompare(next.fullName))
			_.forEach(sortedNamesAndIds, value => {
				value.fullName = getShortName(value.fullName)
			})
			return sortedNamesAndIds
		},

		employee(state) {
			return state.employee
		},
	},

	mutations: {

		updateEmpListArr(state, v) {
			state.empListArr = _.cloneDeep(v)
		},

		pushEmpListArr(state, v) {
			state.empListArr.push(v)
		},

		changeEmpListArrEl(state, { ind, key, value }) {
			state.empListArr[ind][key] = value
		},

		deleteNamesAndIdsEl(state, ind) {
			state.empListArr.splice(ind, 1)
		},

		updateEmp(state, newEmp = cleanEmp) {
			state.employee = newEmp
		},
	},
}
