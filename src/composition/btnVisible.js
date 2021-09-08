import { ref, watch, toRefs } from '@vue/composition-api'

export function useBtnVisible(props) {
	const { btn } = toRefs(props)
	const saveBtnVisible = ref(false)

	watch(btn, s => {
		saveBtnVisible.value = s
	})

	return {saveBtnVisible}
}
