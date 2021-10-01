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
			<IconForm />
		</v-col>
	</v-row>
</template>

<script>
import IconForm from "@/components/IconForm"

export default {
	name: "PageIconForm",

	components: {
		IconForm,
	},

}
</script>

<style scoped>

</style>
