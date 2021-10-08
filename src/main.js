import Vue from "vue"
import VueCompositionAPI from "@vue/composition-api"

Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import router from "./router"
import { store } from "@/store"

new Vue({
	store,
	router,
	vuetify,
	render: h => h(App),
}).$mount("#app")
