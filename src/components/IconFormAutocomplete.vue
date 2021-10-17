<template>
	<v-autocomplete
		:value="icon"
		:multiple="multiple"
		:items="items"
		:filter="iconFilter"
		:rules="rules"
		:search-input.sync="search"
		:loading="loading"
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
import { getMdiIcons } from "@/utils/api"

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
		rules: {
			type: Array,
			default: () => [],
		}
	},

	data() {
		return {
			items: [],
			search: "",
			loading: false,
		}
	},

	async mounted() {
		this.loading = true
		this.items = await getMdiIcons()
		this.loading = false
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
