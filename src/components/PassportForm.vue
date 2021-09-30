<template>
	<v-card
		elevation="4"
		tile
	>
		<v-subheader>Паспортные данные</v-subheader>
		<v-form
			class="pa-3"
			ref="passportFrom"
			@submit.prevent="saveEmp"
		>
			<v-dialog width="500"
				v-model="iconDialog"
			>
				<template v-slot:activator="{ on }">
					<div class="mb-4">
						<v-avatar color="grey">
							<v-icon
								:color="employee.avatar.color"
							>
								{{ `mdi-${employee.avatar.icon}` }}
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
					:pIconConfig="employee.avatar"
					@save="updateIcon"
				/>
			</v-dialog>
			<v-text-field
				label="ФИО"
				outlined
				v-model="employee.fio"
				:rules="nameRules"
				@focus="isBtnDisabled=false"
			/>
			<div class="d-flex align-center">
				<v-text-field
					label="Серия"
					outlined
					class="flex-grow-0"
					v-model="employee.pass_ser"
					:rules="serRules"
					@focus="isBtnDisabled=false"
				/>
				<v-text-field
					label="Номер"
					outlined
					class="flex-grow-1"
					v-model="employee.pass_no"
					:rules="nomRules"
					@focus="isBtnDisabled=false"
				/>
			</div>
			<Calendar
				v-model="employee.pass_dt"
				:receivedDate="employee.pass_dt"
				:rules="dtRules"
			/>
			<v-btn
				:disabled="isBtnDisabled"
				type="submit"
				color="primary"
			>
				Сохранить
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
		Calendar, IconForm
	},
	props: {
		btn: {
			type: Boolean,
		},
		value: {
			type: Object,
			required: true,
		},
		statusText: {
			type: String,
		},
	},

	setup(props, { emit, refs, root }) {
		onMounted( () => iconStorage.init() )

		const iconColorsArr = [
			[ "red", "#F44336" ], [ "pink", "#E91E63" ], [ "purple", "#9C27B0" ], [ "deep-purple", "#673AB7" ],
			[ "indigo", "#3F51B5" ], [ "blue", "#2196F3" ], [ "light-blue", "#03A9F4" ], [ "cyan", "#00BCD4" ],
			[ "teal", "#009688" ], [ "green", "#4CAF50" ], [ "light-green", "#8BC34A" ], [ "lime", "#CDDC39" ],
			[ "yellow", "#FFEB3B" ], [ "amber", "#FFC107" ], [ "orange", "#FF9800" ], [ "deep-orange", "#FF5722" ],
			[ "brown", "#795548" ], [ "blue-grey", "#607D8B" ], [ "grey", "#9E9E9E" ], [ "black", "#000000" ],
			[ "white", "#FFFFFF" ],
		].sort((prev, next) => prev[0] > next[0] ? 1 : -1)

		let { snackbar, text, showSnackbar } = useSnackbar(props)
		const { isBtnDisabled } = useBtnVisability(props)

		return {
			iconColorsArr, snackbar, text,
			isBtnDisabled,
			...useEmployee(props, showSnackbar, emit, refs, root, isBtnDisabled),
			...useRules(),
		}
	},
}

</script>

<style>

</style>
