<template>
	<PageNotFound v-if="isNotFound" />
	<v-row
		v-else
		no-gutters
		justify="center"
	>
		<v-col
			xl="3"
			lg="3"
			md="5"
			sm="5"
		>
			<EmpList
				v-if="!isMobile || (isMobile && isEmpListActive)"
				@addEmp="isEmpListActive = false"
			/>
			<div v-else>
				<div class="d-flex justify-end">
					<v-btn
						text
						plain
						:to="{ name: 'PageHome' }"
					>
						<v-icon>mdi-chevron-left</v-icon>
						Назад
					</v-btn>
				</div>
				<!--TODO: Как использовать 1 компонент PassportForm? -->
				<PassportForm
					:employee="employee"
					:is-btn-disabled="isBtnDisabled"
					:status-text="statusText"
					@saveEmp="saveEmp"
					@removeEmp="removeEmp"
					@fieldFocus="isBtnDisabled = false"
				/>
			</div>
		</v-col>
		<v-col
			v-if="!isMobile"
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<PassportForm
				:employee="employee"
				:is-btn-disabled="isBtnDisabled"
				:status-text="statusText"
				@saveEmp="saveEmp"
				@removeEmp="removeEmp"
				@fieldFocus="isBtnDisabled = false"
			/>
		</v-col>
	</v-row>
</template>

<script>
import _ from "lodash"
import { mapGetters, mapMutations } from "vuex"
import { v1 as uuidv1 } from "uuid"
import { cleanEmp, getEmpStore, setEmpStore } from "@/utils/api"

import PassportForm from "@/components/PassportForm"
import EmpList from "@/components/EmpList"
import PageNotFound from "@/pages/PageNotFound"

export default {
	name: "PageEmp",

	components: {
		PassportForm, EmpList, PageNotFound,
	},

	props: {
		urlId: {
			type: String,
			default: "",
		},
	},

	data() {
		return {
			empStore: {},
			isEmpListActive: true,
			isNotFound: false,
			isBtnDisabled: true,
			empId: "",
			statusText: "",
		}
	},

	computed: {
		...mapGetters([ "empListArr", "employee" ]),
		isMobile() {
			return this.$vuetify.breakpoint.name === "xs"
		},
	},

	watch: {
		urlId(v) {
			this.urlIdHook(v)
		},
	},

	created() {
		const es = getEmpStore()
		this.empStore = es

		const empListArr = []
		_.forEach(es, (v, k) => {
			empListArr.push({ id: k, avatar: v.avatar, fullName: v.fio })
		})
		this.updateEmpListArr(empListArr)

		this.urlIdHook(this.urlId)
	},

	methods: {
		...mapMutations([ "updateEmpListArr", "updateEmp", "pushEmpListArr", "changeEmpListArrEl", "deleteNamesAndIdsEl" ]),
		// Этот хук нужен для того, чтобы реагировать на изменения в urlId и не дублировать код в watch и в created.
		urlIdHook(v) {
			let newEmp = cleanEmp

			if (!v) {
				this.isEmpListActive = true
				this.isNotFound = false
				this.isBtnDisabled = false
				this.empId = ""
			} else if (v === "new-emp") {
				this.isEmpListActive = false
				this.isNotFound = false
				this.isBtnDisabled = false
				this.empId = ""
			} else if (this.findEmpById(this.urlId) === -1) {
				this.isNotFound = true
			} else {
				this.isEmpListActive = false
				this.isNotFound = false
				this.isBtnDisabled = true
				this.empId = v
				newEmp = this.empStore[v]
			}

			this.updateEmp(newEmp)
		},

		saveEmp(newEmp) {
			if ((newEmp.fio !== this.employee.fio) && this.findEmpByName(newEmp.fio) !== -1) {
				this.statusText = "ОШИБКА: Пользователь с таким именем уже существует"
				return //^
			}

			if (!this.empId) {
				this.empId = uuidv1()
				this.pushEmpListArr({ id: this.empId, avatar: newEmp.avatar, fullName: newEmp.fio })
			} else {
				const ind = this.findEmpById(this.empId)
				if (newEmp.fio !== this.employee.fio) {
					this.changeEmpListArrEl({ ind, key: "fullName", value: newEmp.fio })
				}
				if (!_.isEqual(newEmp.avatar, this.employee.avatar)) {
					this.changeEmpListArrEl({ ind, key: "avatar", value: newEmp.avatar })
				}
			}
			this.statusText = "Данные сохранены"
			this.isBtnDisabled = true
			this.updateEmp(newEmp)
			this.empStore[this.empId] = _.assign({}, newEmp)
			setEmpStore(this.empStore)
		},

		removeEmp() {
			this.statusText = "Данные удалены"
			const empStoreId = this.empId

			delete this.empStore[empStoreId]
			const ind = this.findEmpById(empStoreId)

			this.deleteNamesAndIdsEl(ind)
			this.empId = ""


			setEmpStore(this.empStore)
			this.updateEmp()
		},

		findEmpById(id) {
			return _.findIndex(this.empListArr, el => el.id === id)
		},

		findEmpByName(name) {
			return _.findIndex(this.empListArr, el => el.fullName === name)
		},

	},
}
</script>
