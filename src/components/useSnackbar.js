import { ref } from "@vue/composition-api"

let snackbar

export function useSnackbar(timeout) {
	return snackbar = snackbar ?? newSnackbar(timeout)
}

export function newSnackbar(timeout = 3500) {
	let snackbar = ref(false)
	const text = ref("---")

	const showSnackbar = s => {
		text.value = s
		snackbar.value = true
		const close = () => snackbar.value = false
		setTimeout(close, timeout)
		return close
	}

	return {
		// private
		snackbar,
		text,
		// public
		showSnackbar,
	}
}
