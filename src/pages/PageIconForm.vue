<template>
	<v-row no-gutters justify="center">
		<v-col xl="4" lg="4" md="7" sm="7">
			<v-card tile class="pa-4">
				<v-subheader class="text-h4 pt-4 mb-2 primary--text">Иконки</v-subheader>

				<v-form ref="theForm"
					lazy-validation
					class="pa-3"
					@submit.prevent="showIcon">
					<v-text-field
						label="Имя"
						outlined
						:rules="iconNameRules"
						v-model="values.icon"
					/>
					<v-slider
						label="Размер"
						step="20"
						min="20"
						max="400"
						thumb-label
						v-model="values.size"
					/>

					<v-divider/>

					<v-radio-group
						label="Цвет"
						column
						v-model="values.color"
					>
						<v-row>
							<v-col
								cols="4"
								v-for="color in iconColorsArr"
								:key="color[0]"
							>
								<v-radio
									class="d-inline-flex"
									:label="color[0]"
									:color="color[0]"
									:value="color[0]"
								/>
							</v-col>
						</v-row>
					</v-radio-group>

					<v-btn type="submit" color="primary">
						Показать
					</v-btn>
					<v-btn text small color="primary" @click="changeColorArr">
						Change Available Colors
					</v-btn>
				</v-form>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import _ from "lodash"
import { mapGetters, mapMutations } from "vuex"
import { iconStorage, hasIcon } from "@/utils/api"

const iconColorsArr = [
	[ "red", "#F44336" ], [ "pink", "#E91E63" ], [ "purple", "#9C27B0" ], [ "deep-purple", "#673AB7" ],
	[ "indigo", "#3F51B5" ], [ "blue", "#2196F3" ], [ "light-blue", "#03A9F4" ], [ "cyan", "#00BCD4" ],
	[ "teal", "#009688" ], [ "green", "#4CAF50" ], [ "light-green", "#8BC34A" ], [ "lime", "#CDDC39" ],
	[ "yellow", "#FFEB3B" ], [ "amber", "#FFC107" ], [ "orange", "#FF9800" ], [ "deep-orange", "#FF5722" ],
	[ "brown", "#795548" ], [ "blue-grey", "#607D8B" ], [ "grey", "#9E9E9E" ], [ "black", "#000000" ],
	[ "white", "#FFFFFF" ],
].sort((prev, next) => prev[0] > next[0] ? 1 : -1)

export default {
	name: "PageIconForm",

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
		iconColorsArr: () => iconColorsArr,
	},

	async mounted() {
		//TODO maybe on class ???
		document.querySelectorAll(".v-radio .v-icon")
			.forEach((el, ndx) => el.style.color = this.iconColorsArr[ndx][1])
		this.values = _.clone(this.iconConfig)
		await iconStorage.init()
	},

	methods: {
		...mapMutations([ "updatedIconConfig" ]),

		changeColorArr() {
			iconColorsArr.splice(-1)
			// console.log(">>>", iconColorsArr.length) //D
			this.$forceUpdate()
		},

		showIcon() {
			const isValid = this.$refs.theForm.validate()
			if(!isValid) return //^

			this.updatedIconConfig(this.values)
			const { icon, size, color } = this.values

			this.$router.push({
				name: "PageIcon",
				params: { icon },
				query: { size, color },
			})
		},

	},

}
</script>

<style scoped>

</style>
