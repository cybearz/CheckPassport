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
			let sortedNamesAndIds = _.cloneDeep(state.empListArr).sort((curr, next) => curr[1]?.localeCompare(next[1]))
			_.forEach(sortedNamesAndIds, value => {
				value[1] = getShortName(value[1])
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

		pushNamesAndIds(state, newVal) {
			state.empListArr.push(newVal)
		},

		changeNamesAndIds(state, { ind, newFullname }) {
			state.empListArr[ind].splice(1, 1, newFullname)
		},

		deleteNamesAndIdsEl(state, ind) {
			state.empListArr.splice(ind, 1)
		},

		updateEmp(state, newEmp = cleanEmp) {
			state.employee = newEmp
		},
	},

	actions: {
		addNamesAndIds(ctx, newVal) {
			ctx.commit("pushNamesAndIds", newVal)
		},
	},
}
