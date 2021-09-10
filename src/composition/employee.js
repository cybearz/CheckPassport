import { ref, watch, toRefs } from "@vue/composition-api"
import _ from "lodash"
import moment from "moment"

export function useEmployee(props, showSnackbar, emit, refs, isBtnDisabled) {
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

		isBtnDisabled.value = true

		emit("saveEmp", employee.value)

		showSnackbar(statusText.value)
	}

	const removeEmp = () => {
		employee.value = {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		}

		emit('removeEmp')
		showSnackbar("Данные удалены")
	}

	return {employee, saveEmp, removeEmp}
}
