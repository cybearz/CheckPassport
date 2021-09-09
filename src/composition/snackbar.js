import {ref} from "@vue/composition-api";

export function useSnackbar() {
	let snackbar = ref(false)
	let text = ref("")

	const showSnackbar = txt => {
		text.value = txt
		snackbar.value = true
		setTimeout(() => {
			snackbar.value = false
		}, 1000)
	}

	return {snackbar, text, showSnackbar}
}
