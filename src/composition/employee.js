import { ref, watch, onMounted, nextTick } from "@vue/composition-api"
import _ from "lodash"
import moment from "moment"
import { cleanEmp } from "@/utils/api"
import { useSnackbar } from "@/components/useSnackbar"

export function useEmployee(employee, emit, refs, root) {
	const { showSnackbar: notify } = useSnackbar()
	let employeeInner = ref(cleanEmp)

	onMounted(() => {
		employeeInner.value = _.cloneDeep(employee.value)
	})

	watch(employee,
		v => {
			refs.passportFrom.resetValidation()
			employeeInner.value = _.cloneDeep(v)
		},
		{
			deep: true,
		},
	)

	let iconDialog = ref(false)

	const updateIcon = iconData => {
		const { icon, color } = iconData
		employeeInner.value.avatar = {
			icon,
			color,
		}
		iconDialog.value = false
		emit("fieldFocus")
	}

	const saveEmp = () => {
		const isValid = refs.passportFrom.validate()
		if (!isValid) {
			// TODO Допустимо ли обращение через $root?
			nextTick(() => {
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
		emit("saveEmp", employeeInner.value)
		notify("Saved")
	}

	const removeEmp = () => {
		employeeInner.value = cleanEmp
		emit("removeEmp")
		notify("Deleted")
	}

	return { employeeInner, iconDialog, updateIcon, saveEmp, removeEmp }
}
