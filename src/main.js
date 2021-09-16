import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import router from "./router"
import {store} from "@/store"
import VueCompositionAPI from "@vue/composition-api"

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

new Vue({
	store,
	router,
	vuetify,
	render: h => h(App)
}).$mount("#app")
