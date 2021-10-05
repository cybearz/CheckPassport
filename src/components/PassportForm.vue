<template>
	<v-card
		elevation="4"
		tile
	>
		<v-subheader>Паспортные данные</v-subheader>
		<v-form
			ref="passportFrom"
			class="pa-3"
			@submit.prevent="saveEmp"
		>
			<v-dialog
				v-model="iconDialog"
				width="500"
			>
				<template v-slot:activator="{ on }">
					<div class="mb-4">
						<v-avatar color="grey">
							<v-icon
								:color="employeeInner.avatar.color"
							>
								{{ `mdi-${ employeeInner.avatar.icon }` }}
							</v-icon>
						</v-avatar>
						<v-btn
							small
							plain
							v-on="on"
						>
							Создать аватар
						</v-btn>
					</div>
				</template>

				<IconForm
					:icon-data="employeeInner.avatar"
					btn-label="Сохранить"
					@save="updateIcon"
				/>
			</v-dialog>

			<v-text-field
				v-model="employeeInner.fio"
				label="ФИО"
				outlined
				:rules="nameRules"
				@focus="$emit('fieldFocus')"
			/>
			<div class="d-flex align-center">
				<v-text-field
					v-model="employeeInner.pass_ser"
					label="Серия"
					outlined
					class="flex-grow-0"
					:rules="serRules"
					@focus="$emit('fieldFocus')"
				/>
				<v-text-field
					v-model="employeeInner.pass_no"
					label="Номер"
					outlined
					class="flex-grow-1"
					:rules="nomRules"
					@focus="$emit('fieldFocus')"
				/>
			</div>
			<Calendar
				v-model="employeeInner.pass_dt"
				:date="employeeInner.pass_dt"
				:rules="dtRules"
			/>

			<v-btn
				:disabled="isBtnDisabledInner"
				type="submit"
				color="primary"
			>
				Сохранить
			</v-btn>
			<v-btn @click="removeEmp">
				Удалить
			</v-btn>

			<v-snackbar v-model="snackbar">
				{{ statusTextInner }}
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
import { onMounted } from "@vue/composition-api"
import { iconStorage } from "@/utils/api"
import { useBtnVisability } from "@/composition/btnVisability"
import { useEmployee } from "@/composition/employee"
import { useSnackbar } from "@/composition/snackbar"
import { useRules } from "@/composition/rules"

import Calendar from "@/components/Calendar"
import IconForm from "@/components/IconForm"

export default {
	name: "PassportForm",

	components: {
		Calendar, IconForm,
	},
	props: {
		employee: {
			type: Object,
			required: true,
		},
		isBtnDisabled: {
			type: Boolean,
		},
		statusText: {
			type: String,
			default: "",
		},
	},

	setup(props, { emit, refs, root }) {
		onMounted(() => iconStorage.init())

		let { snackbar, statusTextInner, showSnackbar } = useSnackbar(props)
		const { isBtnDisabledInner } = useBtnVisability(props)

		return {
			snackbar, statusTextInner,
			isBtnDisabledInner,
			...useEmployee(props, showSnackbar, emit, refs, root),
			...useRules(),
		}
	},
}

</script>

<style>

</style>
