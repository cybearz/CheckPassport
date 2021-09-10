import Vue from 'vue'
import VueRouter from 'vue-router'
import PageMain from '@/pages/PageMain'
import PageProfile from "@/pages/PageProfile";
import PageNotFound from "@/pages/PageNotFound";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'main',
		component: PageMain,
	},

	{
		path: '/profile',
		name: 'profile',
		component: PageProfile
	},

	{
		path: '/:urlId',
		name: 'empPassport',
		component: PageMain,
		props: true
	},

	{
		path: '*',
		name: 'notFound',
		component: PageNotFound,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
