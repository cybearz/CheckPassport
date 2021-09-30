import { ref, watch, toRefs, onMounted } from "@vue/composition-api"
import _ from "lodash"
import moment from "moment"
import { cleanEmp } from "@/utils/api"

export function useEmployee(props, showSnackbar, emit, refs, root, isBtnDisabled) {
	const { value } = toRefs(props)

	let employee = ref(cleanEmp)

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

	let iconDialog = ref(false)

	const updateIcon = iconConfig => {
		const {icon, color} = iconConfig
		employee.value.avatar = {
			icon,
			color
		}
		iconDialog.value = false
		isBtnDisabled.value = false
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
		employee.value = cleanEmp
		emit("removeEmp")
		showSnackbar()
	}

	return { employee, iconDialog, updateIcon, saveEmp, removeEmp }
}
