<template>
	<v-card
		elevation="4"
		tile
	>
		<v-subheader>Паспортные данные</v-subheader>
		<v-form
			ref="form"
			class="pa-3"
		>
			<v-text-field
				label="ФИО"
				outlined
				v-model="employee.fio"
				:rules="nameRules"
				@focus="saveBtnVisible = true"
			/>
			<div class="d-flex align-center">
				<v-text-field
					label="Серия"
					outlined
					class="flex-grow-0"
					v-model="employee.pass_ser"
					:rules="serRules"
					@focus="saveBtnVisible = true"
				/>
				<v-text-field
					label="Номер"
					outlined
					class="flex-grow-1"
					v-model="employee.pass_no"
					:rules="nomRules"
					@focus="saveBtnVisible = true"
				/>
			</div>
			<Calendar
				v-model="employee.pass_dt"
				:recievedDate="employee.pass_dt"
				:rules="dtRules"
				@focus="saveBtnVisible = true"
			/>
			<v-btn
				v-if="saveBtnVisible"
				@click="saveEmp"
			>Сохранить
			</v-btn>
			<v-btn @click="removeEmp">Удалить</v-btn>

			<v-snackbar v-model="snackbar">{{ text }}
				<template v-slot:action="{ attrs }">
					<v-btn
						color="blue"
						text
						v-bind="attrs"
						@click="snackbar = false"
					>
						Close
					</v-btn>
				</template>
			</v-snackbar>

		</v-form>
	</v-card>
</template>

<script>
import Calendar from "@/components/Calendar"
import _ from "lodash";
import moment from "moment";

export default {
	components: {
		Calendar,
	},
	props: {
		btn: {
			type: Boolean,
		},
		value: {
			type: Object,
			required: true
		},
		statusText: {
			type: String,
		}
	},
	data: function () {
		return {
			saveBtnVisible: false,
			employee: {
				fio: "",
				pass_ser: "",
				pass_no: "",
				pass_dt: "",
			},
			nameRules: [
				v => !!v || "Введите имя",
				v => /^( *[a-zA-Zа-яА-ЯёЁ]{2,} +[a-zA-Zа-яА-ЯёЁ]{2,} +[a-zA-Zа-яА-ЯёЁ]{2,} *)+$/.test(v) || "Пример: Иванов Иван Иванович."
			],
			serRules: [
				v => !!v || "Введите серию",
				v => /^( *\d{4} *)+$/.test(v) || "Пример: 1210."
			],
			nomRules: [
				v => !!v || "Введите номер",
				v => /^( *\d{6} *)+$/.test(v) || "Пример: 111111."
			],
			dtRules: [
				v => !!v || "Введите дату"
			],

			snackbar: false,
			toggleSnackbar: true,
			text: ""
		}
	},

	methods: {
		saveEmp() {
			if (!this.$refs.form.validate()) {
				return
			}

			_.forIn(this.employee, (value, key) => {
				this.employee[key] = _.trim(_.replace(value, /\s+/g, ' '))
			})

			this.employee["pass_dt"] = moment(this.employee["pass_dt"]).format("YYYY-MM-DDThh:mm:ssZ")

			this.saveBtnVisible = false

			this.$emit("saveEmp", this.employee)

			this.text = this.statusText ? this.statusText : "Данные сохранены"
			this.toggleSnackbar = !this.toggleSnackbar

		},

		removeEmp() {
			this.text = "Данные удалены"
			this.toggleSnackbar = !this.toggleSnackbar

			this.employee = {
				fio: "",
				pass_ser: "",
				pass_no: "",
				pass_dt: "",
			}

			this.$emit('removeEmp')
		},
	},
	computed: {},
	watch: {
		value: {
			handler: function() {
				_.assign(this.employee, this.value)
			},
			deep: true
		},

		btn(s) {
			this.saveBtnVisible = s
		},

		toggleSnackbar() {
			this.snackbar = true
			setTimeout(() => {
				this.snackbar = false
			}, 1000)
		}
	}
}
</script>

<style>

</style>
