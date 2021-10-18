import Vue from "vue"
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import flushPromises from 'flush-promises'
import * as api from "@/utils/api"
import IconForm from "@/components/IconForm"

// localVue.use(Vuetify) - так нельзя
Vue.use(Vuetify)

describe("IconForm.vue", () => {
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

	it("renders header", () => {
		const header = wrapper.find(".v-subheader")
		expect(header.text()).toBe("Иконки")
	})

	it("renders v-autocomplete", () => {
		const VAutocomplete = wrapper.find(".v-autocomplete")
		expect(VAutocomplete.exists()).toBe(true)
	})

	it("renders v-slider", () => {
		const VSlider = wrapper.find(".v-slider")
		expect(VSlider.exists()).toBe(true)
	})

	it("doesn't render v-slider if icon is a String", async () => {
		const iconData = {
			icon: "alert",
			size: "60",
			color: "white",
		}
		wrapper.setProps({iconData})
		await flushPromises()

		const VSlider = wrapper.find(".v-slider")
		expect(VSlider.exists()).toBe(false)
	})

	it("renders v-input--radio-group", () => {
		const VRadio = wrapper.find(".v-input--radio-group")
		expect(VRadio.exists()).toBe(true)
	})

	it("renders submit v-btn", () => {
		const VBtn = wrapper.find(".v-btn[type='submit']")
		expect(VBtn.exists()).toBe(true)
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
		console.log(wrapper.html()) //D
		const form =  wrapper.find(".v-form")

		form.trigger('submit.prevent')
		expect(wrapper.emitted("save")).toHaveLength(1)
	})

	it("renders chip for each icon in props.iconData.icon", async () => {
		const autocomplete = wrapper.find(".v-autocomplete")
		const chips = autocomplete.findAll(".v-chip")
		expect(chips).toHaveLength(iconData.icon.length)
	})
})
