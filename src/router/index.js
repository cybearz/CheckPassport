import Vue from "vue"
import VueRouter from "vue-router"
import PageEmp from "@/pages/PageEmp"
import PageProfile from "@/pages/PageProfile"
import PageNotFound from "@/pages/PageNotFound"
import PageIcon from "@/pages/PageIcon"
import PageIconForm from "@/pages/PageIconForm"
import PagePosts from "@/pages/PagePosts"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "PageHome",
		component: PageEmp,
	},
	{
		path: "/profile",
		name: "PageProfile",
		component: PageProfile,
	},

	{
		path: "/board",
		name: "PagePosts",
		component: PagePosts,
	},

	{
		path: "/icons",
		name: "PageIconForm",
		component: PageIconForm,
	},
	{
		path: "/mdi/:icon",
		name: "PageIcon",
		component: PageIcon,
		props: true,
	},

	{
		path: "/:urlId",
		name: "PageEmp",
		component: PageEmp,
		props: true,
	},

	// TODO Это вообще, скорее всего, удалю и сделаю notFound компонентом, а не страницей
	{
		path: "/notFound",
		name: "notFound",
		component: PageNotFound,
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

export default router
