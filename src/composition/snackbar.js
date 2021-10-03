import { ref, toRefs, watch } from "@vue/composition-api"

export function useSnackbar(props) {
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
		}, 1000)
	}

	return { snackbar, statusTextInner, showSnackbar }
}
