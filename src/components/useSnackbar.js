import { ref } from "@vue/composition-api"

export function useSnackbar(timeout = 3500) {
	let snackbar = ref(false)
	const text = ref("---")

	const showSnackbar = s => {
		text.value = s
		snackbar.value = true
		const close = () => snackbar.value = false
		setTimeout(close, timeout)
		return close
	}

	return { snackbar, text, showSnackbar }
}
