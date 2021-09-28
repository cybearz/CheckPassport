import _ from "lodash"

import { getShortName } from "@/utils/getShortName"
import { cleanEmp, getEmpStore, setEmpStore } from "@/utils/api"

export default {
	state: {
		empStore: {},
		empListArr: [],
		employee: cleanEmp,
	},

	getters: {
		empStore(state) {
			return state.empStore
		},

		empListArr(state) {
			return state.empListArr
		},

		sortedNamesAndIds(state) {
			let sortedNamesAndIds = _.cloneDeep(state.empListArr).sort((curr, next) => curr[0]?.localeCompare(next[0]))
			_.forEach(sortedNamesAndIds, value => {
				value[0] = getShortName(value[0])
			})
			return sortedNamesAndIds
		},

		employee(state) {
			return state.employee
		},
	},

	mutations: {
		downloadEmpStore(state, newEmpStore) {
			state.empStore = newEmpStore
		},

		changeEmpStore(state, { id, newEmp }) {
			state.empStore[id] = _.assign({}, newEmp)
		},

		deleteEmpStoreKey(state, empStoreId) {
			delete state.empStore[empStoreId]
		},

		pushNamesAndIds(state, newVal) {
			state.empListArr.push(newVal)
		},

		changeNamesAndIds(state, { ind, newFullname }) {
			state.empListArr[ind].splice(0, 1, newFullname)
		},

		deleteNamesAndIdsEl(state, ind) {
			state.empListArr.splice(ind, 1)
		},
		// FIXME допустим ли такой дефолтный параметр?
		updateEmp(state, newEmp = cleanEmp,
		) {
			state.employee = newEmp
		},
	},

	actions: {
		downloadEmpStore(ctx) {
			//FIXME проверка isEmpty нужна для предотвращения повторного
			// обновления данных при одностраничном роутинге. Тем не менее должен быть способ получше
			if (!_.isEmpty(ctx.state.empStore)) return

			const s = getEmpStore()
			if (s) ctx.commit("downloadEmpStore", s)
		},

		uploadEmpStore(ctx) {
			setEmpStore(ctx.getters.empStore)
		},

		addNamesAndIds(ctx, newVal) {
			if (newVal) {
				ctx.commit("pushNamesAndIds", newVal)
			} else if (_.isEmpty(ctx.getters.empListArr)) {
				_.forEach(ctx.getters.empStore, (value, id) => {
					ctx.commit("pushNamesAndIds", [ value.fio, id ])
				})
			}
		},
	},
}
