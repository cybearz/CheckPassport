<template>
	<v-row no-gutters justify="center">
		<v-col xl="4" lg="4" md="7" sm="7">
			<v-card tile class="pa-4">
				<v-subheader class="text-h4 pt-4 mb-2 primary--text">Иконки</v-subheader>

				<v-form ref="theForm" class="pa-3" @submit.prevent="showIcon">
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
		iconColorsArr: [
			"red", "pink", "purple", "deep-purple",
			"indigo", "blue", "light-blue", "cyan",
			"teal", "green", "light-green", "lime",
			"yellow", "amber", "orange", "deep-orange",
			"brown", "blue-grey", "grey", "black",
			"white",
		].sort(),

		values: {
			icon: "",
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

		showIcon() {
			if (!this.$refs.theForm.validate()) return //^

			this.updatedIconConfig(this.values)
			const { icon: icon, size, color } = this.values

			this.$router.push({
				name: "PageIcon",
				params: { icon },
				query: { size, color },
			})
		},

	},

	computed: {
		...mapGetters([ "iconConfig" ]),
	},

}
</script>

<style scoped>

</style>
