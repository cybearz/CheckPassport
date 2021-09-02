<template>
	<v-card
		tile
		flat
	>
		<v-list class="py-0">
			<div class="d-flex align-center">
				<v-subheader>Сотрудники</v-subheader>
				<v-spacer></v-spacer>
				<v-btn
					x-small
					rounded
					dark
					color="blue-grey"
					class="mx-4"
					@click="$emit('addEmp')"
				>
					<v-icon size="16">mdi-plus</v-icon>
				</v-btn>
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
				<v-list-item
					v-for="i in sortedNamesAndIds"
					:key="i[1]"
					@click="$emit('showPassport', i[1])"
				>
					<v-list-item-content>
						<v-list-item-title>{{ i[0] }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
import _ from 'lodash'

export default {
	props: {
		namesAndIds: {
			type: Array,
			required: true
		}
	},
	data: () => ({
		sortedNamesAndIds: []
	}),
	watch: {
		namesAndIds: {
			handler: function () {
				this.sortedNamesAndIds = [...this.namesAndIds].sort((curr, next) => curr[0]?.localeCompare(next[0]))
				_.forEach(this.sortedNamesAndIds, value => {
					let [surname, name, midName] = value[0].split(" ")
					surname = surname.toLowerCase()
					surname = surname[0].toUpperCase() + surname.slice(1)
					value[0] = `${surname} ${name[0].toUpperCase()}. ${midName[0].toUpperCase()}.`
				})
			},
			deep: true
		}
	}
}
</script>

<style>

</style>
