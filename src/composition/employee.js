import { ref, watch, toRefs, onMounted } from "@vue/composition-api"
import _ from "lodash"
import moment from "moment"
import { cleanEmp } from "@/utils/api"

export function useEmployee(props, showSnackbar, emit, refs, root, isBtnDisabledInner) {
	const { employee } = toRefs(props)

	let employeeInner = ref(cleanEmp)

	onMounted(() => {
			employeeInner.value = _.cloneDeep(employee.value)
		},
	)

	watch(employee, v => {
			refs.passportFrom.resetValidation()
			employeeInner.value = _.cloneDeep(v)
		},
		{ deep: true },
	)

	let iconDialog = ref(false)

	const updateIcon = iconConfig => {
		const { icon, color } = iconConfig
		employeeInner.value.avatar = {
			icon,
			color,
		}
		iconDialog.value = false
		isBtnDisabledInner.value = false
	}

	const saveEmp = () => {
		const isValid = refs.passportFrom.validate()
		if (!isValid) {
			// TODO Допустимо ли обращение через $root?
			root.$nextTick(() => {
				const errorEl = document.querySelector(".v-messages__message:first-of-type")
				const inputEl = errorEl.parentNode.parentNode.parentNode.parentNode
				root.$vuetify.goTo(inputEl)
			})
			return //^
		}

		_.forIn(employeeInner.value, (value, key) => {
			//TODO Оптимизировать?
			if (key !== "avatar") employeeInner.value[key] = _.trim(_.replace(value, /\s+/g, " "))
		})

		employeeInner.value.pass_dt = moment(employeeInner.value.pass_dt).format("YYYY-MM-DDThh:mm:ssZ")
		isBtnDisabledInner.value = true
		emit("saveEmp", employeeInner.value)
		showSnackbar()
	}

	const removeEmp = () => {
		employeeInner.value = cleanEmp
		emit("removeEmp")
		showSnackbar()
	}

	return { employeeInner, iconDialog, updateIcon, saveEmp, removeEmp }
}
