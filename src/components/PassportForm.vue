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
				:value="employee.fio"
				:rules="nameRules"
				@input="$emit('input', 'fio', $event)"
				@focus="$emit('focus')"
			></v-text-field>
			<div class="d-flex align-center">
				<v-text-field
					label="Серия"
					outlined
					class="flex-grow-0"
					:value="employee.pass_ser"
					:rules="serRules"
					@input="$emit('input', 'pass_ser', $event)"
					@focus="$emit('focus')"
				></v-text-field>
				<v-text-field
					label="Номер"
					outlined
					class="flex-grow-1"
					:value="employee.pass_no"
					:rules="nomRules"
					@input="$emit('input', 'pass_no', $event)"
					@focus="$emit('focus')"
				></v-text-field>
			</div>
			<Calendar
				:pass_dt="employee.pass_dt"
				:rules="dtRules"
				@input="$emit('input', 'pass_dt', $event)"
				@focus="$emit('focus')"
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

export default {
	components: {
		Calendar,
	},
	props: {
		saveBtnVisible: {
			type: Boolean,
			required: true
		},
		employee: {
			type: Object,
			required: true
		}
	},
	data: () => ({
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
	}),
	methods: {
		saveEmp() {
			if (this.$refs.form.validate()) {
				this.$emit('saveEmp')
				this.text = "Данные сохранены"
				this.toggleSnackbar = !this.toggleSnackbar
			}
		},
		removeEmp() {
			this.$emit('removeEmp')
			this.text = "Данные удалены"
			this.toggleSnackbar = !this.toggleSnackbar
		},
	},
	computed: {},
	watch: {
		toggleSnackbar() {
			console.log("we r watching u")
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
