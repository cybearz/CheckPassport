<template>
	<v-row no-gutters justify="center">
		<v-col cols="4">
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
						label="Имя иконки"
						outlined
						:rules="iconNameRules"
						v-model="mdi"
					/>
					<v-radio-group
						column
						v-model="color"
						:rules="iconColorRules"
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
export default {
	name: "PageIconConfig",

	data: () => ({
		libColor: [
			"red", "pink", "purple", "deep-purple",
			"indigo", "blue", "light-blue", "cyan",
			"teal", "green", "light-green", "lime",
			"yellow", "amber", "orange", "deep-orange",
			"brown", "blue-grey", "grey", "black",
			"white",
		],
		mdi: "",
		color: "",
		iconNameRules: [
			v => !!v || "Введите имя",
		],
		iconColorRules: [
			v => !!v || "Выберите цвет",
		],
	}),

	mounted() {
		this.libColor.sort((curr, next) => curr > next)
	},

	methods: {
		showIcon() {
			if (!this.$refs.form.validate()) return
			this.$router.push({ name: 'showIcon', params: { icon: `${ this.mdi }-${ this.color }` } })
		},

		getSlicedArr(col) {
			const lenCol = this.libColor.length / 3
			return this.libColor.slice(lenCol * (col - 1), lenCol * col)
		},
	},

}
</script>

<style scoped>

</style>
