import { ref, watch, toRefs } from '@vue/composition-api'
import _ from "lodash";
import moment from "moment";

export function useEmployee(props, text, toggleSnackbar, emit, refs, saveBtnVisible, statusText) {
	const { value } = toRefs(props)
	let employee = ref({
		fio: "",
		pass_ser: "",
		pass_no: "",
		pass_dt: "",
	})

	watch(value, newValue => {
		_.assign(employee.value, newValue)
	},
		{deep: true})

	const saveEmp = () => {
		if (!refs.form.validate()) {
			return
		}

		_.forIn(employee.value, (value, key) => {
			employee.value[key] = _.trim(_.replace(value, /\s+/g, ' '))
		})

		employee.value["pass_dt"] = moment(employee.value["pass_dt"]).format("YYYY-MM-DDThh:mm:ssZ")

		saveBtnVisible = false

		emit("saveEmp", employee.value)

		text = statusText ? statusText : "Данные сохранены"
		toggleSnackbar = !toggleSnackbar

	}

	const removeEmp = () => {
		text = "Данные удалены"
		toggleSnackbar = !toggleSnackbar

		employee.value = {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		}

		emit('removeEmp')
	}

	return {employee, saveEmp, removeEmp, }
}
