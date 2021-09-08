import {ref, watch} from "@vue/composition-api";

export function useSnackbar() {
	let text = ref("")
	let snackbar = ref(false)
	let toggleSnackbar = ref(true)

	watch(toggleSnackbar, () => {
		snackbar.value = true
		setTimeout(() => {
			snackbar.value = false
		}, 1000)
	})

	return {text, snackbar, toggleSnackbar}
}
