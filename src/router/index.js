import Vue from 'vue'
import VueRouter from 'vue-router'
import PageMain from '@/pages/PageMain'
import ProfilePage from "@/pages/PageProfile";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: PageMain,
	},
	{
		path: '/profile',
		component: ProfilePage
	},
	{
		path: '/:id',
		component: PageMain,
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
