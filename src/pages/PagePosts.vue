<template>
	<v-row
		no-gutters
		justify="center"
	>
		<v-col
			xl="4"
			lg="4"
			md="7"
			sm="7"
		>
			<v-card
				v-for="post in posts"
				:key="post.id"
				class="mb-4"
			>
				<v-card-title>{{ post.title }}</v-card-title>
				<v-card-text>{{ post.body }}</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { getPosts } from "@/utils/api"
export default {
	name: "PagePosts",

	data() {
		return {
			posts: [],
		}
	},

	async mounted() {
		this.posts = await getPosts()
	}

}
</script>

<style scoped>

</style>
