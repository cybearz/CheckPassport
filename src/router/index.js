import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/PageMain'
import ProfilePage from "../pages/PageProfile";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Main,
	},
	{
		path: '/profile',
		component: ProfilePage
	},
	{
		path: '/:id',
		component: Main,
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
