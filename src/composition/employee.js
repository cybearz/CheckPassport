import { ref, watch, toRefs, onMounted } from "@vue/composition-api"
import _ from "lodash"
import moment from "moment"

export function useEmployee(props, showSnackbar, emit, refs, isBtnDisabled) {
	const { value } = toRefs(props)

	let employee = ref({
		fio: "",
		pass_ser: "",
		pass_no: "",
		pass_dt: "",
	})

	//FIXME "employee.value = _.assign({}, value.value)" выполняется 2 раза
	onMounted(() => {
			employee.value = _.assign({}, value.value)
		},
	)

	watch(value, v => {
			refs.form.resetValidation()

			employee.value = _.assign({}, v)
		},
		{ deep: true },
	)

	const saveEmp = () => {
		if (!refs.form.validate()) return

		_.forIn(employee.value, (value, key) => {
			employee.value[key] = _.trim(_.replace(value, /\s+/g, " "))
		})

		employee.value.pass_dt = moment(employee.value.pass_dt).format("YYYY-MM-DDThh:mm:ssZ")

		isBtnDisabled.value = true

		emit("saveEmp", employee.value)

		showSnackbar()
	}

	const removeEmp = () => {
		employee.value = {
			fio: "",
			pass_ser: "",
			pass_no: "",
			pass_dt: "",
		}

		emit("removeEmp")

		showSnackbar()
	}

	return { employee, saveEmp, removeEmp }
}
