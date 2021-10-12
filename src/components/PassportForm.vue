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

			<!-- actions -->
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
		</v-form>
	</v-card>
</template>

<script>
import { ref, toRefs, watch } from "@vue/composition-api"
import { RULES } from "@/utils/rules"
import { useEmployee } from "@/composition/employee"

import TheSnackbar from "@/components/TheSnackbar"
import Calendar from "@/components/Calendar"
import IconForm from "@/components/IconForm"

export default {
	name: "PassportForm",
	components: { Calendar, IconForm, TheSnackbar },

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
		const { employee, isBtnDisabled } = toRefs(props)
		const isBtnDisabledInner = ref(isBtnDisabled.value)

		watch(isBtnDisabled, v => {
			isBtnDisabledInner.value = v
		})

		return {
			...RULES,
			isBtnDisabledInner,
			...useEmployee(employee, emit, refs, root),
		}
	},
}

</script>

<style>

</style>
