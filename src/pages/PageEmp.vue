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

				<PassportForm
					:value="employee"
					:btn="isBtnDisabled"
					:status-text="statusText"
					@saveEmp="saveEmp"
					@removeEmp="removeEmp"
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
				:value="employee"
				:btn="isBtnDisabled"
				:status-text="statusText"
				@saveEmp="saveEmp"
				@removeEmp="removeEmp"
			/>
		</v-col>
	</v-row>
</template>

<script>
import _ from "lodash"
import { mapGetters, mapMutations } from "vuex"
import { v1 as uuidv1 } from "uuid"
import { getEmpStore, setEmpStore } from "@/utils/api"

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
		empId(newEmpId) {
			if (this.empId) {
				this.updateEmp(this.empStore[newEmpId])
				this.isBtnDisabled = true
			} else {
				this.updateEmp()
				this.isBtnDisabled = false
			}
		},
		// Для переключения между сотрудниками в списке
		urlId(v) {
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
			} else {
				this.isEmpListActive = false
				this.isNotFound = false
				this.isBtnDisabled = true
				this.empId = v
			}
		},
	},

	mounted() {
		const es = getEmpStore()
		this.empStore = es

		const empListArr = []
		_.forEach(es, (v, k) => {
			empListArr.push({ id: k, avatar: v.avatar, fullName: v.fio })
		})
		this.updateEmpListArr(empListArr)

		if (!this.urlId) {
			this.isBtnDisabled = false
		} else if (this.urlId === "new-emp") {
			this.isEmpListActive = false
			this.isBtnDisabled = false
		} else if (this.findEmpById(this.urlId) === -1) {
			this.isNotFound = true
		} else {
			this.isEmpListActive = false
			this.empId = this.urlId
		}
	},

	methods: {
		...mapMutations([ "updateEmpListArr", "updateEmp", "pushEmpListArr", "changeEmpListArrEl", "deleteNamesAndIdsEl" ]),

		saveEmp(newEmp) {
			if (!this.empId && this.findEmpByName(newEmp.fio) !== -1) {
				this.statusText = "ОШИБКА: Пользователь с таким именем уже существует"
				return
			} else {
				this.statusText = "Данные сохранены"
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
