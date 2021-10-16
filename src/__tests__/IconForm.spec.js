import Vue from "vue"
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import flushPromises from 'flush-promises'
import * as api from "@/utils/api"
import IconForm from "@/components/IconForm"

const localVue = createLocalVue()
// localVue.use(Vuetify) - так нельзя
Vue.use(Vuetify)

describe("IconForm.vue", () => {
	test("sanity test", () => {
		console.log(IconForm)
	})
	//FIXME поискать другой способ мокать функцию
	api.getMdiIcons = jest.fn(() =>
		Promise.resolve(["passport", "alert", "dog"])
	)

	const vuetify = new Vuetify()

	const createWrapper = iconData => mount(IconForm, {
		localVue,
		vuetify,
		propsData: { iconData },
		attachToDocument: true
	})

	it("renders chip for each icon in props.iconData.icon", async () => {
		const iconData = {
			icon: ["passport", "alert"],
			size: "60",
			color: "white",
		}
		const wrapper = createWrapper(iconData)

		await flushPromises()
		const autocomplete = wrapper.find(".v-autocomplete")
		const chips = autocomplete.findAll(".v-chip")

		expect(chips.length).toBe(iconData.icon.length)
	})

	it("prints an error on form submit if the icon's name input is empty", async () => {
		const iconData = {
			icon: [],
			size: "60",
			color: "white",
		}
		const wrapper = createWrapper(iconData)

		await flushPromises()
		const form =  wrapper.find(".v-form")
		form.trigger('submit.prevent')

		await flushPromises()
		const error = wrapper.find(".v-messages__message")
		expect(error.exists()).toBe(true)
	})
})
