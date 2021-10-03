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
				:pIconConfig="icon"
				@save="saveIcon"
				btnLabel="Показать"
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
			icon: {},
		}
	},

	methods: {
		saveIcon(v) {
			console.log(">>>", v) //D
		}
	}
}
</script>

<style scoped>

</style>
