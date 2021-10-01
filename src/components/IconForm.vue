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
				label="Имя"
				outlined
				:rules="iconNameRules"
				v-model="values.icon"
			/>
			<v-slider
				v-if="isPageIconForm"
				label="Размер"
				step="20"
				min="20"
				max="400"
				thumb-label
				v-model="values.size"
			/>

			<v-divider />

			<v-radio-group
				label="Цвет"
				column
				v-model="values.color"
			>
				<v-row>
					<v-col
						cols="4"
						v-for="color in iconColors"
						:key="color"
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
				{{ btnText }}
			</v-btn>
			<v-btn
				v-if="isPageIconForm"
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
import { mapGetters, mapMutations } from "vuex"
import { cleanEmp, iconStorage, hasIcon } from "@/utils/api"

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
			default: cleanEmp,
		},
	},

	data() {
		return {
			values: {
				icon: "",
				size: "",
				color: "",
			},

			iconNameRules: [
				v => !!v || "Введите имя",
				v => {
					for (let icon of v.split(",")) {
						if (icon && !hasIcon(icon))
							return `Иконка "${ icon }" не существует` //^
					}
					return true
				},
			],
			errMsg: "",
		}
	},

	computed: {
		...mapGetters([ "iconConfig" ]),

		iconColors: () => iconColors,

		isPageIconForm() {
			return this.$route.name === "PageIconForm"
		},

		btnText() {
			return this.isPageIconForm ? "Показать" : "Сохранить"
		},
	},

	watch: {
		pIconConfig: {
			deep: true,
			handler: function(v) {
				if (this.isPageIconForm) return
				this.values = _.clone(v)
			},
		},
	},

	async mounted() {
		if (!this.isPageIconForm)
			this.iconNameRules[1] = v => (hasIcon(v)) ? true : `Иконка "${ v }" не существует` //^
		//TODO maybe on class ???
		document.querySelectorAll(".v-radio .v-icon")
			.forEach((el, ndx) => el.classList.add(`${ this.iconColors[ndx] }--text`))
		this.values = this.isPageIconForm ? _.clone(this.iconConfig) : _.clone(this.pIconConfig)
		await iconStorage.init()
	},

	methods: {
		...mapMutations([ "updatedIconConfig" ]),

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

			if (this.isPageIconForm) {
				this.updatedIconConfig(this.values)
				const { icon, size, color } = this.values

				this.$router.push({
					name: "PageIcon",
					params: { icon },
					query: { size, color },
				})
			} else {
				this.$emit("save", this.values)
			}
		},

	},

}
</script>

<style scoped>

</style>
