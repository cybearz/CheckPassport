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
		name: "PageMain",
		component: PageMain,
	},

	{
		path: "/icons",
		name: "PageIconForm",
		component: PageIconForm,
	},

	{
		path: "/profile",
		name: "PageProfile",
		component: PageProfile,
	},

	{
		path: "/mdi/:icon",
		name: "PageIcon",
		component: PageIcon,
		props: true,
	},
// FIXME Здесь не могу сделать name: "PageMain": нарушится логика
	{
		path: "/:urlId",
		name: "empPassport",
		component: PageMain,
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
