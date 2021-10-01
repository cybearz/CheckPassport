<template>
	<v-menu
		v-model="menu"
		:close-on-content-click="false"
		max-width="290"
	>
		<template #activator="{ on }">
			<v-text-field
				:value="rusDate"
				:rules="rules"
				outlined
				readonly
				label="Дата выдачи"
				@input="changeDate"
				v-on="on"
				@focus="menu = true"
			/>
		</template>
		<v-date-picker
			:value="date"
			:max="curDate"
			@input="changeDate"
			@change="menu = false"
		/>
	</v-menu>
</template>

<script>
import moment from "moment"

export default {
	name: "Calendar",

	props: {
		rules: {
			required: true,
		},
		receivedDate: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		date: "",
		curDate: moment().format("YYYY-MM-DD"),
		menu: false,
	}),

	computed: {
		rusDate() {
			return this.date ? moment(this.date).format("DD-MM-YYYY") : ""
		},
	},

	watch: {
		receivedDate() {
			this.date = this.receivedDate ? moment(this.receivedDate).format("YYYY-MM-DD") : ""
		},
	},

	methods: {
		changeDate(e) {
			this.$emit("input", e)
		},
	},
}
</script>

<style>

</style>
