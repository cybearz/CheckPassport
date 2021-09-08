import { ref, watch, toRefs } from "@vue/composition-api"
import _ from "lodash"
import moment from "moment"

export function useEmployee(props, text, toggleSnackbar, emit, refs, saveBtnVisible) {
	const { value, statusText } = toRefs(props)
	let employee = ref({
		fio: "",
		pass_ser: "",
		pass_no: "",
		pass_dt: "",
	})

	watch(value, newValue => {
		_.assign(employee.value, newValue)
	},
		{deep: true}
	)

	const saveEmp = () => {
		if (!refs.form.validate()) {
			return
		}

		_.forIn(employee.value, (value, key) => {
			employee.value[key] = _.trim(_.replace(value, /\s+/g, ' '))
		})

		employee.value["pass_dt"] = moment(employee.value["pass_dt"]).format("YYYY-MM-DDThh:mm:ssZ")

		saveBtnVisible.value = false

		emit("saveEmp", employee.value)
		console.log(statusText.value)
		text.value = statusText.value ? statusText.value : "Данные сохранены"
		toggleSnackbar.value = !toggleSnackbar.value

	}

	const removeEmp = () => {
		text.value = "Данные удалены"
		toggleSnackbar.value = !toggleSnackbar.value

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
