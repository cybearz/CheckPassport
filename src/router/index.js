import Vue from 'vue'
import VueRouter from 'vue-router'
import PageMain from '@/pages/PageMain'
import ProfilePage from "@/pages/PageProfile";

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
		component: ProfilePage
	},
	{
		path: '/:urlId',
		name: 'empPassport',
		component: PageMain,
		props: true
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
