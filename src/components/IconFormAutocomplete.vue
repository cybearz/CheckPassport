<template>
	<v-autocomplete
		:value="icon"
		:multiple="multiple"
		:items="items"
		:filter="iconFilter"
		:rules="rules"
		label="Имя"
		chips
		outlined
		auto-select-first
		@change="$emit('change', $event)"
	>
		<template v-slot:selection="data">
			<v-chip
				v-bind="data.attrs"
				:input-value="data.selected"
				close
				@click="data.select"
				@click:close="$emit('click:closeIcon', data.item)"
			>
				<v-icon left>
					{{ "mdi-" + data.item }}
				</v-icon>
				{{ data.item }}
			</v-chip>
		</template>
		<template v-slot:item="data">
			<v-list-item-avatar>
				<v-icon left>
					{{ "mdi-" + data.item }}
				</v-icon>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-subtitle>{{ data.item }}</v-list-item-subtitle>
			</v-list-item-content>
		</template>
	</v-autocomplete>
</template>

<script>
export default {
	name: "IconFormAutocomplete",

	model: {
		prop: "icon",
		event: "change",
	},

	props: {
		icon: {
			type: [String, Array],
			default: "",
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: [],
		},
		rules: {
			type: Array,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: [],
		}
	},

	data() {
		return {

		}
	},

	methods: {
		iconFilter(item, querryText) {
			const regexp = new RegExp(`^${querryText}[\\w\-]*`)
			return regexp.test(item)
		},
	}
}
</script>

<style scoped>

</style>
