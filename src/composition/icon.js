import { ref } from "@vue/composition-api"

export function useIcon(refs) {
	let iconDialog = ref(false)

	const submitIcon = () => {
		const isValid = refs.iconForm.validate()
		if(!isValid) return //^
		iconDialog.value = false
	}
	return { iconDialog, submitIcon }
}
