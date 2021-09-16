import { ref, watch, toRefs } from "@vue/composition-api"

export function useBtnVisability(props) {
	const { btn } = toRefs(props)
	const isBtnDisabled = ref(false)

	watch(btn, s => {
		isBtnDisabled.value = s
	})

	return {isBtnDisabled}
}
