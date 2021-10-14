import Vue from "vue"
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import * as api from "@/utils/api"
import IconForm from "@/components/IconForm"

const localVue = createLocalVue()
Vue.use(Vuetify)

describe("IconForm.vue", () => {
	let wrapper
	beforeEach(() => {
		//FIXME поискать другой способ мокать функцию
		api.getMdiIcons = jest.fn(() =>
			Promise.resolve(["passport", "alert", "dog"])
		)
		const vuetify = new Vuetify()
		const iconData = {
			icon: "alert",
			size: "400",
			color: "white",
		}

		wrapper = mount(IconForm, {
			localVue,
			vuetify,
			propsData: { iconData }
		})
	})

	afterEach(() => {
		wrapper.destroy()
	})


	it("renders chip for each icon in props.iconData.icon", () => {
		const autocomplete = wrapper.find(".v-autocomplete")
		const chipLen = autocomplete.findAll(".v-chip").length
		expect(chipLen).toBe(1)
	})
})
