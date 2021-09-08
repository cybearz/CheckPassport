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
import {toRefs} from "@vue/composition-api"

import Calendar from "@/components/Calendar"

import {useBtnVisible} from "@/composition/btnVisible"
import {useEmployee} from "@/composition/employee"
import {useSnackbar} from "@/composition/snackbar"
import {useRules} from "@/composition/rules"

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

	setup(props, {emit, refs}) {
		const {statusText} = toRefs(props)

		let {text, snackbar, toggleSnackbar} = useSnackbar()
		const {saveBtnVisible} = useBtnVisible(props)

		return {
			snackbar, toggleSnackbar, text,
			saveBtnVisible,
			...useEmployee(props, text, toggleSnackbar, emit, refs, saveBtnVisible, statusText),
			...useRules()
		}
	}
}

</script>

<style>

</style>
