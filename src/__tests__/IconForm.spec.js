import Vue from "vue"
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import flushPromises from 'flush-promises'
import * as api from "@/utils/api"
import IconForm from "@/components/IconForm"

// localVue.use(Vuetify) - так нельзя
Vue.use(Vuetify)

describe("IconForm.vue: multiple=true", () => {
	let wrapper
	const iconData = {
		icon: ["passport", "alert"],
		size: "60",
		color: "white",
	}

	beforeEach(async () => {
		const localVue = createLocalVue()
		const vuetify = new Vuetify()

		let node = document.createElement("div")
		node.setAttribute("id", "app")
		node.setAttribute("data-app", "true")
		console.log("outer:\n", node.outerHTML) //D
		document.body.appendChild(node)

		wrapper = mount(IconForm, {
			localVue,
			vuetify,
			propsData: { iconData },
			attachTo: "#app"
		})
		await flushPromises()
	})

	afterEach(() => {
		wrapper.destroy()
	})

	api.getMdiIcons = jest.fn(() =>
		Promise.resolve(["passport", "alert", "dog"])
	)

	test("sanity test", () => {
		console.log(IconForm)
	})

	it("renders chip for each icon in props.iconData.icon", async () => {
		const autocomplete = wrapper.find(".v-autocomplete")
		const chips = autocomplete.findAll(".v-chip")

		expect(chips).toHaveLength(iconData.icon.length)
	})

	it("renders an error message on form submit if the icon's name input is empty", async () => {
		const iconData = {
			icon: [],
			size: "60",
			color: "white",
		}
		wrapper.setProps({iconData})

		const form =  wrapper.find(".v-form")
		form.trigger('submit.prevent')
		await flushPromises()
		const error = wrapper.find(".v-messages__message")

		expect(error.exists()).toBe(true)
	})

	it("emits 'save' when form is submitted", async () => {
		const form =  wrapper.find(".v-form")
		form.trigger('submit.prevent')

		expect(wrapper.emitted("save")).toHaveLength(1)
	})
})
