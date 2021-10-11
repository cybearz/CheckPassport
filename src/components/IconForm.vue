<template>
	<v-card
		tile
		class="pa-4"
	>
		<v-subheader class="text-h4 pt-4 mb-2 primary--text">
			Иконки
		</v-subheader>

		<v-form
			ref="theForm"
			lazy-validation
			class="pa-3"
			@submit.prevent="submit"
		>
			<v-autocomplete
				v-else
				v-model="values.icon"
				:multiple="multiple"
				:items="allIcons"
				:filter="iconFilter"
				:rules="rulesIconName"
				label="Имя"
				chips
				outlined
				auto-select-first
			>
				<template v-slot:selection="data">
					<v-chip
						v-bind="data.attrs"
						:input-value="data.selected"
						close
						@click="data.select"
						@click:close="values.icon = ''"
					>
						<v-icon
							:class="values.color + '--text'"
							left
						>
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
			<v-slider
				v-if="multiple"
				v-model="values.size"
				label="Размер"
				step="20"
				min="20"
				max="400"
				thumb-label
			/>

			<v-divider />

			<v-radio-group
				v-model="values.color"
				label="Цвет"
				column
			>
				<v-row>
					<v-col
						v-for="color in iconColors"
						:key="color"
						cols="4"
					>
						<v-radio
							class="d-inline-flex"
							:label="color"
							:color="color"
							:value="color"
						/>
					</v-col>
				</v-row>
			</v-radio-group>

			<v-btn
				type="submit"
				color="primary"
			>
				{{ btnLabel }}
			</v-btn>
			<v-btn
				v-if="multiple"
				text
				small
				color="primary"
				@click="changeColorArr"
			>
				Change Available Colors
			</v-btn>
		</v-form>
	</v-card>
</template>

<script>
import _ from "lodash"
import { getMdiIcons, hasIcon } from "@/utils/api"

const iconColors = [
	"red", "pink", "purple", "deep-purple",
	"indigo", "blue", "light-blue", "cyan",
	"teal", "green", "light-green", "lime",
	"yellow", "amber", "orange", "deep-orange",
	"brown", "blue-grey", "grey", "black",
	"white",
].sort()

export default {
	name: "IconForm",

	props: {
		iconData: {
			type: Object,
			default: undefined,
		},
		btnLabel: {
			type: String,
			default: "ОК",
		},
		multiple: Boolean,
	},

	data() {
		return {
			values: {
				icon: "",
				size: "",
				color: "",
			},
			allIconsReady: false,
			errMsg: "",
		}
	},

	computed: {

		iconColors: () => iconColors,
		rulesIconName() {
			const ruleIcon = v => hasIcon(v)
				? true
				: `Иконка "${ v }" не существует`
			return [
				v => !!v || "Введите имя",
				this.multiple
					? v => {
						for (let icon of v) {
							const b = ruleIcon(icon)
							if (b !== true) return b
						}
						return true
					}
					: ruleIcon,
			]
		},
	},

	watch: {
		iconData: {
			immediate: true,
			handler: function(v) {
				this.values = _.clone(v)
			},
		},
	},

	async created() {
		this.allIcons = await getMdiIcons()
		this.allIconsReady = true
	},

	mounted() {
		document.querySelectorAll(".v-radio .v-icon")
			.forEach((el, ndx) => el.classList.add(`${ this.iconColors[ndx] }--text`))
	},

	methods: {

		changeColorArr() {
			iconColors.splice(-1)
			this.$forceUpdate()
		},

		iconFilter(item, querryText) {
			const regexp = new RegExp(`^${querryText}[\\w\-]*`)
			return regexp.test(item)
		},

		submit() {
			const isValid = this.$refs.theForm.validate()
			if (!isValid) {
				this.$nextTick(() => {
					const errorEl = document.querySelector(".v-messages__message:first-of-type")
					const inputEl = errorEl.parentNode.parentNode.parentNode.parentNode
					this.$vuetify.goTo(inputEl)
				})
				return //^
			}
			this.$emit("save", this.values)
		},

	},

}
</script>

<style scoped>

</style>
