import Vue from "vue"
import VueRouter from "vue-router"
import PageMain from "@/pages/PageMain"
import PageProfile from "@/pages/PageProfile"
import PageNotFound from "@/pages/PageNotFound"
import PageIcon from "@/pages/PageIcon"
import PageIconForm from "@/pages/PageIconForm"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "main",
		component: PageMain,
	},

	{
		path: "/icons",
		name: "icons",
		component: PageIconForm
	},

	{
		path: "/profile",
		name: "profile",
		component: PageProfile
	},

	{
		path: "/mdi-:icon",
		name: "showIcon",
		component: PageIcon,
		props: true
	},

	{
		path: "/:urlId",
		name: "empPassport",
		component: PageMain,
		props: true
	},

	{
		path: "/notFound",
		name: "notFound",
		component: PageNotFound,
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
