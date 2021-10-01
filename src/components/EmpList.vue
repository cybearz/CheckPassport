<template>
	<v-card
		tile
		flat
	>
		<v-list class="py-0">
			<div class="d-flex align-center">
				<v-subheader>Сотрудники</v-subheader>
				<v-spacer />
				<router-link
					style="text-decoration: none; color: inherit;"
					:to="{name: 'PageEmp', params: {urlId: 'new-emp'}}"
				>
					<v-btn
						x-small
						rounded
						dark
						class="mx-4"
					>
						<v-icon size="16">
							mdi-plus
						</v-icon>
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
						<v-list-item-subtitle class="text-center">
							Добавьте первого сотрудника
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<router-link
					style="text-decoration: none; color: inherit;"
					v-for="i in sortedNamesAndIds"
					:key="i.id"
					:to="{name: 'PageEmp', params: {urlId: i.id}}"
				>
					<v-list-item>
						<v-list-item-icon>
							<v-icon
								:color="i.avatar.color"
							>
								{{ `mdi-${ i.avatar.icon }` }}
							</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ i.fullName }}</v-list-item-title>
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
