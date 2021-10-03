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
			<v-text-field
				v-model="values.icon"
				label="Имя"
				outlined
				:rules="rulesIconName"
			/>
			<v-slider
				v-if="multiple"
				v-model="values.size"
				label="Размер"
				step="20"
				min="20"
				max="400"
				thumb-label
			/>

			<v-divider/>

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
import { iconStorage, hasIcon } from "@/utils/api"

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
		pIconConfig: {
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
						for (let icon of v.split(",")) {
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
		pIconConfig: {
			immediate: true,
			handler: function(v) {
				this.values = _.clone(v)
			},
		},
	},

	async mounted() {
		document.querySelectorAll(".v-radio .v-icon")
			.forEach((el, ndx) => el.classList.add(`${ this.iconColors[ndx] }--text`))
		await iconStorage.init()
	},

	methods: {

		changeColorArr() {
			iconColors.splice(-1)
			this.$forceUpdate()
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
