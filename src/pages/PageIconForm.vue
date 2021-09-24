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
						:value="icon"
						@input="changeIcon($event)"
					/>
					<v-slider
						label="Размер"
						step="20"
						min="20"
						max="400"
						thumb-label
						:value="size"
						@input="changeSize($event)"
					/>
					<v-divider/>
					<v-radio-group
						label="Цвет"
						column
						:rules="iconColorRules"
						:value="color"
						@change="changeColor($event)"
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
		iconNameRules: [
			v => !!v || "Введите имя",
			v => matchIcon(v) || "Иконка не существует"
		],
		iconColorRules: [
			v => !!v || "Выберите цвет",
		],
	}),

	async mounted() {
		await iconStorage.init()
	},

	methods: {
		...mapMutations(["changeIcon", "changeSize", "changeColor"]),

		showIcon() {
			if (!this.$refs.form.validate()) return
			this.$router.push({ name: 'showIcon', params: { icon: this.icon } })
		},

		getSlicedArr(col) {
			const lenCol = this.libColors.length / 3
			return this.libColors.slice(lenCol * (col - 1), lenCol * col)
		},
	},

	computed: {
		...mapGetters([ "icon", "size", "color", "libColors" ])
	}

}
</script>

<style scoped>

</style>
