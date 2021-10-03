import { ref, watch, toRefs } from "@vue/composition-api"

export function useBtnVisability(props) {
	const { isBtnDisabled } = toRefs(props)
	const isBtnDisabledInner = ref(isBtnDisabled.value)

	watch(isBtnDisabled, v => {
		console.log(">>>watch", v) //D
		isBtnDisabledInner.value = v
	})

	return { isBtnDisabledInner }
}
