import { ref, toRefs, watch } from "@vue/composition-api"

export function useSnackbar(props, timeout = 3500) {
	const { statusText } = toRefs(props)
	let snackbar = ref(false)
	let statusTextInner = ref("")

	watch(statusText, newText => {
		statusTextInner.value = newText
	})

	const showSnackbar = () => {
		snackbar.value = true
		setTimeout(() => {
			snackbar.value = false
		}, timeout)
	}

	return { snackbar, statusTextInner, showSnackbar }
}
