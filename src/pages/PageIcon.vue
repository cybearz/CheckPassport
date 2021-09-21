<template>
	<PageNotFound v-if="isNotFound"/>
	<v-row v-else no-gutters justify="center">
		<v-col cols="4" align-self="center">
			<div class="d-flex justify-center">
				<v-icon :size="size" :class=iconColor>{{ mdi }}</v-icon>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import PageNotFound from "@/pages/PageNotFound"

import { mapGetters, mapMutations } from "vuex"

import { hasIcon } from "@/utils/api"

export default {
	name: "PageIcon",

	props: {
		icon: {
			default: "",
		},
	},

	components: {
		PageNotFound
	},

	data: () => ({
		isNotFound: false
	}),

	async mounted() {
		this.changeIcon(this.icon)

		if (!await hasIcon(this.icon)) {
			this.isNotFound = true
			return //^
		}

		const size = this.$route.query?.size
		if (size) this.changeSize(size)

		const color = this.$route.query?.color
		if (color) this.changeColor(`${ color }--text`)
	},

	methods: {
		...mapMutations(["changeIcon", "changeSize", "changeColor"])
	},

	computed: {
		...mapGetters([ "mdi", "size", "iconColor" ])
	}
}
</script>

<style scoped>

</style>
