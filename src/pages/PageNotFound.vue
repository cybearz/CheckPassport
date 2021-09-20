<template>
	<v-row no-gutters justify="center">
		<v-col cols="4">
			<v-card class="pa-3">
				<v-row align="center">
					<v-col cols="6">
						<div class="d-flex justify-center">
							<div class="text-h1 font-weight-black">4</div>
							<v-icon size="96" class="mt-n3">mdi-robot</v-icon>
							<div class="text-h1 font-weight-black">4</div>
						</div>
					</v-col>
					<v-col cols="6">
						<v-card flat>
							<v-card-title class="text-uppercase">Ошибка</v-card-title>
							<v-card-subtitle>Запрашиваемая страница не найдена</v-card-subtitle>
							<v-card-actions>
								<router-link
									style="text-decoration: none; color: inherit;"
									:to="{name: 'main'}"
								>
									<v-btn plain>
										<v-icon left>mdi-arrow-left</v-icon>
										На главную
									</v-btn>
								</router-link>
							</v-card-actions>
						</v-card>
					</v-col>
					<v-col>
						<v-row align="center" no-gutters>
							<v-col cols="11">
								<v-text-field
									filled
									hide-details
									placeholder="Как мы можем помочь?"
									outlined
									dense
								/>
							</v-col>
							<v-col cols="1">
								<v-btn
									class="py-2"
									outlined
									depressed
									block
									tile
									height="100%"
								>
									<v-icon>mdi-chat</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: "PageNotFound",
}
</script>

<style scoped>

</style>
