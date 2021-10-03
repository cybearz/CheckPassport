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
					:iconData="employeeInner.avatar"
					btnLabel="Сохранить"
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
				{{ text }}
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
		isBtnDisabled: {
			type: Boolean,
		},
		employee: {
			type: Object,
			required: true,
		},
		statusText: {
			type: String,
			default: "",
		},
	},

	setup(props, { emit, refs, root }) {
		onMounted(() => iconStorage.init())

		const iconColorsArr = [
			[ "red", "#F44336" ], [ "pink", "#E91E63" ], [ "purple", "#9C27B0" ], [ "deep-purple", "#673AB7" ],
			[ "indigo", "#3F51B5" ], [ "blue", "#2196F3" ], [ "light-blue", "#03A9F4" ], [ "cyan", "#00BCD4" ],
			[ "teal", "#009688" ], [ "green", "#4CAF50" ], [ "light-green", "#8BC34A" ], [ "lime", "#CDDC39" ],
			[ "yellow", "#FFEB3B" ], [ "amber", "#FFC107" ], [ "orange", "#FF9800" ], [ "deep-orange", "#FF5722" ],
			[ "brown", "#795548" ], [ "blue-grey", "#607D8B" ], [ "grey", "#9E9E9E" ], [ "black", "#000000" ],
			[ "white", "#FFFFFF" ],
		].sort((prev, next) => prev[0] > next[0] ? 1 : -1)

		let { snackbar, text, showSnackbar } = useSnackbar(props)
		const { isBtnDisabledInner } = useBtnVisability(props)

		return {
			iconColorsArr, snackbar, text,
			isBtnDisabledInner,
			...useEmployee(props, showSnackbar, emit, refs, root, isBtnDisabledInner),
			...useRules(),
		}
	},
}

</script>

<style>

</style>
