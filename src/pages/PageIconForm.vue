<template>
	<v-row no-gutters justify="center">
		<v-col
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<v-card
				elevation="4"
				tile
			>
				<v-subheader>Настройка иконки</v-subheader>
				<v-form
					ref="form"
					class="pa-3"
				>
					<v-text-field
						label="Имя"
						outlined
						:rules="iconNameRules"
						v-model="textIconsArr"
					/>
					<v-slider
						label="Размер"
						step="20"
						min="20"
						max="400"
						thumb-label
						v-model="lclIconSize"
					/>
					<v-divider/>
					<v-radio-group
						label="Цвет"
						column
						:rules="iconColorRules"
						v-model="lclIconColor"
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

					<v-btn @click="showIcon">
						Показать
					</v-btn>

				</v-form>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

import { iconStorage, matchIcon } from "@/utils/api"

export default {
	name: "PageIconConfig",

	data: () => ({
		textIconsArr: "",
		lclIconSize: "",
		lclIconColor: "",
		iconNameRules: [
			v => !!v || "Введите имя",
			v => {
				for (let icon of v.split(",")) {
					if (!matchIcon(icon)) return `Иконка "${icon}" не существует`
				}
				return true
			},
		],
	}),

	async mounted() {
		this.textIconsArr = this.iconsArr.join(',')
		this.lclIconSize = this.iconSize
		this.lclIconColor = this.iconColor
		await iconStorage.init()
	},

	methods: {
		...mapMutations([ "updateIconsArr", "changeIconSize", "changeIconColor"]),

		getSlicedArr(col) {
			const lenCol = this.iconColorsArr.length / 3
			return this.iconColorsArr.slice(lenCol * (col - 1), lenCol * col)
		},

		showIcon() {
			if (!this.$refs.form.validate()) return //^
			this.updateIconsArr(this.textIconsArr.split(","))
			this.changeIconSize(this.lclIconSize)
			this.changeIconColor(this.lclIconColor)
			this.$router.push({ name: 'PageIcon' })
		},

	},

	computed: {
		...mapGetters([ "iconsArr", "iconSize", "iconColor",  "iconColorsArr"]),
	},

}
</script>

<style scoped>

</style>
