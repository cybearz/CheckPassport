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
		avatar: {
			icon: "",
			color: "",
		}
	})

	onMounted(() => {
			employee.value = _.cloneDeep(value.value)
		},
	)

	watch(value, v => {
			refs.passportFrom.resetValidation()

			employee.value = _.cloneDeep(v)
		},
		{ deep: true },
	)

	const saveEmp = () => {
		if (!refs.passportFrom.validate()) return

		_.forIn(employee.value, (value, key) => {
			//TODO Оптимизировать?
			if (key !== "avatar") employee.value[key] = _.trim(_.replace(value, /\s+/g, " "))
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
			avatar: {
				icon: "",
				color: ""
			}
		}

		emit("removeEmp")

		showSnackbar()
	}

	return { employee, saveEmp, removeEmp }
}
