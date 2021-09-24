<template>
	<v-card
		tile
		flat
	>
		<v-list class="py-0">
			<div class="d-flex align-center">
				<v-subheader>Сотрудники</v-subheader>
				<v-spacer></v-spacer>
				<router-link
					style="text-decoration: none; color: inherit;"
					:to="{name: 'empPassport', params: {urlId: 'new-emp'}}"
				>
					<v-btn
						x-small
						rounded
						dark
						class="mx-4"
					>
						<v-icon size="16">mdi-plus</v-icon>
					</v-btn>
				</router-link>
			</div>
			<v-list-item-group
				color="primary"
			>
				<v-list-item
					v-if="sortedNamesAndIds.length === 0"
					inactive
				>
					<v-list-item-content>
						<v-list-item-subtitle class="text-center">Добавьте первого сотрудника</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<router-link
					style="text-decoration: none; color: inherit;"
					v-for="i in sortedNamesAndIds"
					:key="i[1]"
					:to="{name: 'empPassport', params: {urlId: i[1]}}"
				>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>{{ i[0] }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</router-link>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
export default {
	name: "EmpList",

	computed: {
		sortedNamesAndIds() {
			return this.$store.getters.sortedNamesAndIds
		},
	},
}
</script>

<style>

</style>
