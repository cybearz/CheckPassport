<template>
	<v-row
		no-gutters
		justify="center"
	>
		<v-col
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<IconForm
				multiple
				:icon-data="iconsArr"
				btn-label="Показать"
				@save="saveIcon"
			/>
		</v-col>
	</v-row>
</template>

<script>
import IconForm from "@/components/IconForm"

export default {
	name: "PageIconForm",
	components: { IconForm },

	data() {
		return {
			iconsArr: this.$store.getters["icons/data"],
		}
	},

	methods: {
		saveIcon(values) {
			const { icon, size, color } = values

			this.$router.push({
				name: "PageIcon",
				params: { icon: icon.join(",") },
				query: { size, color },
			})
		},
	},
}
</script>

<style scoped>

</style>
