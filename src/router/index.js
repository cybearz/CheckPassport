import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main'
import ProfilePage from "../pages/ProfilePage";

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

// router.beforeEach((to, from, next) => next((to.path !== from.path)))
export default router
