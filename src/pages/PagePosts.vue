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
			<div
				v-intersect="onIntersect"
			/>
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
			page: 0,
			limit: 10,
			totalPages: 1,
		}
	},

	methods: {
		async fetchPosts() {
			const { posts, totalPages } = await getPosts(this.page, this.limit)
			console.log(posts, totalPages) //D
			this.posts = [...this.posts, ...posts]
			this.totalPages = totalPages
		},

		onIntersect(entries) {
			if (this.page < this.totalPages && entries[0].isIntersecting) {
				this.page++
				this.fetchPosts()
			}
		},
	}
}
</script>

<style scoped>

</style>
