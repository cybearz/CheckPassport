<template>
	<PageNotFound v-if="isNotFound" />
	<v-row v-else
		no-gutters
		justify="center"
	>
		<v-col
			xl="3"
			lg="3"
			md="5"
			sm="5"
		>
			<EmpList v-if="!isMobile || (isMobile && isEmpListActive)"
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

		<!-- mobile -->

		<v-col v-if="!isMobile"
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
import { mapMutations } from "vuex"
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
			employee: cleanEmp,
			empStore: {},
			isEmpListActive: true,
			isNotFound: false,
			isBtnDisabled: true,
			statusText: "",
		}
	},

	computed: {
		empList() {
			return this.$store.getters["empStore/empList"]
		},

		isMobile() {
			return this.$vuetify.breakpoint.name === "xs"
		},

		empId() {
			const urlId = this.urlId
			return (urlId === "new-emp" || !urlId)
				? ""
				: urlId
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

		const empList = []
		_.forEach(es, (v, k) => {
			empList.push({ id: k, avatar: v.avatar, fullName: v.fio })
		})
		this.set(empList)

		this.urlIdHook(this.urlId)
	},

	methods: {
		...mapMutations("empStore", [ "set", "pushEmpList", "setEmpListEl", "remove" ]),
		// Этот хук нужен для того, чтобы реагировать на изменения в urlId и не дублировать код в watch и в created.
		urlIdHook(v) {
			let newEmp = cleanEmp

			if (!v) {
				this.isEmpListActive = true
				this.isNotFound = false
				this.isBtnDisabled = false
			} else if (v === "new-emp") {
				this.isEmpListActive = false
				this.isNotFound = false
				this.isBtnDisabled = false
			} else if (this.findEmpById(this.urlId) === -1) {
				this.isNotFound = true
			} else {
				this.isEmpListActive = false
				this.isNotFound = false
				this.isBtnDisabled = true
				newEmp = this.empStore[v]
			}

			this.employee = _.clone(newEmp)
		},

		saveEmp(newEmp) {
			if ((newEmp.fio !== this.employee.fio) && this.findEmpByName(newEmp.fio) !== -1) {
				this.statusText = "ОШИБКА: Пользователь с таким именем уже существует"
				return //^
			}

			let empId = this.empId
			if (!empId) {
				empId = uuidv1()
				this.pushEmpList({ id: empId, avatar: newEmp.avatar, fullName: newEmp.fio })
				this.$router.push({ name: "PageEmp", params: { urlId: empId } })
			} else {
				const ind = this.findEmpById(empId)
				if (newEmp.fio !== this.employee.fio) {
					this.setEmpListEl({ ind, key: "fullName", value: newEmp.fio })
				}
				if (!_.isEqual(newEmp.avatar, this.employee.avatar)) {
					this.setEmpListEl({ ind, key: "avatar", value: newEmp.avatar })
				}
			}

			this.statusText = "Данные сохранены"
			this.empStore[empId] = _.clone(newEmp)
			setEmpStore(this.empStore)
			this.employee = _.clone(newEmp)
		},

		removeEmp() {
			this.statusText = "Данные удалены"

			if (!this.empId) return //^
			delete this.empStore[this.empId]
			const ind = this.findEmpById(this.empId)
			this.remove(ind)

			setEmpStore(this.empStore)
			this.$router.push({ name: "PageEmp", params: { urlId: "new-emp" } })
		},

		findEmpById(id) {
			return _.findIndex(this.empList, el => el.id === id)
		},

		findEmpByName(name) {
			return _.findIndex(this.empList, el => el.fullName === name)
		},

	},
}
</script>
