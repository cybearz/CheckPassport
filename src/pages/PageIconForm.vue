<template>
	<v-row no-gutters justify="center">
		<v-col lg="6" sm="8">
			<v-card tile class="pa-4">
				<v-subheader class="text-h4 pt-4 mb-2 primary--text">Иконки</v-subheader>

				<v-form ref="form" class="pa-3" @submit.prevent="showIcon">
					<v-text-field
						label="Имя"
						outlined
						:rules="iconNameRules"
						v-model="values.textIcons"
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
								v-for="col in 3"
								:key="col"
							>

								<v-radio
									v-for="(color, ind) in getSlicedArr(col)"
									:key="ind"
									:label="color"
									:color="color"
									:value="color"
								/>
							</v-col>
						</v-row>
					</v-radio-group>

					<v-btn type="submit" color="primary">
						Показать
					</v-btn>
				</v-form>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import _ from "lodash"
import { mapGetters, mapMutations } from "vuex"
import { iconStorage, matchIcon } from "@/utils/api"

export default {
	name: "PageIconConfig",

	data: () => ({
		values: {
			textIcons: "",
			size: "",
			color: "",
		},

		iconNameRules: [
			v => !!v || "Введите имя",
			v => {
				for (let icon of v.split(",")) {
					if (!matchIcon(icon)) return `Иконка "${ icon }" не существует`
				}
				return true
			},
		],
	}),

	async mounted() {
		this.values = _.clone(this.iconConfig)
		await iconStorage.init()
	},

	methods: {
		...mapMutations([ "updatedIconConfig" ]),

		getSlicedArr(col) {
			const lenCol = this.iconColorsArr.length / 3

			return this.iconColorsArr.slice(lenCol * (col - 1), lenCol * col)
		},

		showIcon() {
			if (!this.$refs.form.validate()) return //^

			this.updatedIconConfig(this.values)
			const { textIcons: icon, size, color } = this.values

			this.$router.push({
				name: "PageIcon",
				params: { icon },
				query: { size, color },
			})
		},

	},

	computed: {
		...mapGetters([ "iconConfig", "iconColorsArr" ]),
	},

}
</script>

<style scoped>

</style>
