<template>
	<v-footer padless>
		<v-col
			class="text-center"
			cols="12"
		>
			<span class="pointer-cursor"
				@click="incYear"
			>{{ year }}</span> —
			<strong :class="['pointer-cursor', titleClass]"
				@click="decYear"
			>CheckPassport</strong>
		</v-col>
	</v-footer>
</template>

<script>
import { ref, computed, reactive } from "@vue/composition-api"

// vuex analog

let theState

export function getTheState() {
	return theState || reactive({ v: 1 })
}

// composition api sample

function useYear(cur) {
	theState = getTheState()
	const year = ref(cur)
	return {
		theState,
		year,
		isFuture: computed(() => year.value > cur + 1),
		isPast: computed(() => year.value < cur - 1),
		incYear: () => year.value += 1,
	}
}


export default {
	name: "MyFooter",

	setup() {
		// don't use "this" in setup()
		return {
			...useYear(2021),
		}
	},

	// Composition & Option API mix sample

	computed: {
		titleClass() {
			return this.isFuture
				? "green--text"
				: (this.isPast ? "grey--text text--darken-2" : undefined)
		},
	},

	methods: {
		decYear() {
			this.year -= 1
		},
	},
}
</script>

<style lang="sass">
.no-select
	user-select: none
	// iOS Safari
	-webkit-touch-callout: none
	// Safari
	-webkit-user-select: none
	// Konqueror HTML
	-khtml-user-select: none
	// Old versions of Firefox
	-moz-user-select: none

.pointer-cursor
	@extend .no-select
	cursor: pointer
</style>
