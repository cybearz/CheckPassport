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
							<v-icon>mdi-account</v-icon>
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
				<v-card tile class="pa-4">
					<v-subheader class="text-h4 pt-4 mb-2 primary--text">Иконки</v-subheader>
					<v-form ref="iconForm"
									lazy-validation
									class="pa-3"
									@submit.prevent="submitIcon">
						<v-text-field
							label="Имя"
							:rules="iconNameRules"
							outlined
							v-model="employee.avatar.icon"
						/>

						<v-divider/>

						<v-radio-group
							label="Цвет"
							column
							v-model="employee.avatar.color"
						>
							<v-row>
								<v-col
									cols="4"
									v-for="color in iconColorsArr"
									:key="color[0]"
								>
									<v-radio
										class="d-inline-flex"
										:label="color[0]"
										:color="color[0]"
										:value="color[0]"
									/>
								</v-col>
							</v-row>
						</v-radio-group>

						<v-btn type="submit" color="primary">
							Сохранить
						</v-btn>
					</v-form>
				</v-card>
			</v-dialog>
			<v-text-field
				label="ФИО"
				outlined
				v-model="employee.fio"
				:rules="nameRules"
				@focus="$emit('btnChange')"
			/>
			<div class="d-flex align-center">
				<v-text-field
					label="Серия"
					outlined
					class="flex-grow-0"
					v-model="employee.pass_ser"
					:rules="serRules"
					@focus="$emit('btnChange')"
				/>
				<v-text-field
					label="Номер"
					outlined
					class="flex-grow-1"
					v-model="employee.pass_no"
					:rules="nomRules"
					@focus="$emit('btnChange')"
				/>
			</div>
			<Calendar
				v-model="employee.pass_dt"
				:receivedDate="employee.pass_dt"
				:rules="dtRules"
				@focus="$emit('btnChange')"
			/>
			<v-btn
				type="submit"
				color="primary"
				:disabled="isBtnDisabled"
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
import { onMounted } from "@vue/composition-api"
import { iconStorage } from "@/utils/api"
import { useBtnVisability } from "@/composition/btnVisability"
import { useEmployee } from "@/composition/employee"
import { useSnackbar } from "@/composition/snackbar"
import { useRules } from "@/composition/rules"
import { useIcon } from "@/composition/icon"

import Calendar from "@/components/Calendar"

export default {
	name: "PassportForm",

	components: {
		Calendar,
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

	setup(props, { emit, refs }) {
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
			...useEmployee(props, showSnackbar, emit, refs, isBtnDisabled),
			...useIcon(refs),
			...useRules(),
		}
	},
}

</script>

<style>

</style>
