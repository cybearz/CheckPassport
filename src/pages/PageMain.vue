<template>
	<PageNotFound v-if="isNotFound"/>
	<v-row v-else no-gutters justify="center">
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
					<router-link
						style="text-decoration: none; color: inherit;"
						:to="{ name: 'main' }"
					>
						<v-btn
							text
							plain
						>
							<v-icon>mdi-chevron-left</v-icon>
							Назад
						</v-btn>
					</router-link>
				</div>

				<PassportForm
					:value="employee"
					:btn="isBtnDisabled"
					@btnChange="isBtnDisabled=false"
					:statusText="statusText"
					@saveEmp="saveEmp($event)"
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
				@btnChange="isBtnDisabled=false"
				:statusText="statusText"
				@saveEmp="saveEmp($event)"
				@removeEmp="removeEmp"
			/>
		</v-col>
	</v-row>
</template>

<script>
import PassportForm from "@/components/PassportForm"
import EmpList from "@/components/EmpList"
//FIXME перенести PageNotFound в компоненты???
import PageNotFound from "@/pages/PageNotFound"

import _ from "lodash"
import {mapActions, mapGetters, mapMutations} from "vuex"
import {v1 as uuidv1} from "uuid"

export default {
	name: "PageMain",

	props: {
		urlId: {
			type: String,
			default: "",
		},
	},

	components: {
		PassportForm, EmpList, PageNotFound,
	},

	data: () => ({
		isEmpListActive: true,
		isNotFound: false,
		isBtnDisabled: true,
		empId: "",
		statusText: "",
	}),

	mounted() {
		this.downloadEmpStore()
		this.addNamesAndIds()

		if (!this.urlId) {
			this.isBtnDisabled = false
		} else if (this.urlId === "new-emp") {
			this.isEmpListActive = false
			this.isBtnDisabled = false
		} else if (this.findEmpById(this.urlId) === -1) {
			this.isNotFound = true
		} else {
			this.empId = this.urlId
		}
	},

	methods: {
		...mapActions(["downloadEmpStore", "uploadEmpStore", "addNamesAndIds"]),
		...mapMutations(["clearEmp", "updateEmp", "pushNamesAndIds", "changeEmpStore", "changeNamesAndIds", "deleteEmpStoreKey", "deleteNamesAndIdsEl"]),

		saveEmp(newEmp) {
			if (!this.empId && this.findEmpByName(newEmp.fio) !== -1) {
				this.statusText = "ОШИБКА: Пользователь с таким именем уже существует"
				return
			} else {
				this.statusText = "Данные сохранены"
			}

			if (!this.empId) {
				this.empId = uuidv1()
				this.addNamesAndIds([newEmp.fio, this.empId])
			} else {
				const oldFio = this.employee.fio

				if (newEmp.fio !== oldFio) {
					const ind = this.findEmpById(this.empId)

					this.changeNamesAndIds({ind, newFullname: newEmp.fio})
				}
			}

			this.updateEmp(newEmp)
			this.changeEmpStore({id: this.empId, newEmp})
			this.uploadEmpStore()
		},

		removeEmp() {
			this.statusText = "Данные удалены"
			const empStoreId = this.empId

			if (this.empStore[empStoreId]) {
				this.deleteEmpStoreKey(empStoreId)
				const ind = this.findEmpById(empStoreId)

				this.deleteNamesAndIdsEl(ind)
				this.empId = ""
			}

			this.uploadEmpStore()
			this.clearEmp()
		},

		findEmpById(id) {
			return _.findIndex(this.namesAndIds, el => el[1] === id)
		},

		findEmpByName(name) {
			return _.findIndex(this.namesAndIds, el => el[0] === name)
		},

	},

	computed: {
		...mapGetters(["empStore", "namesAndIds", "employee"]),
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
				this.clearEmp()
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
}
</script>
