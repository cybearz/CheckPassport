import _ from "lodash"
import axios from "axios"

export const cleanEmp = {
	fio: "",
	pass_ser: "",
	pass_no: "",
	pass_dt: "",
	avatar: {
		icon: "account",
		color: "white",
	},
}

class LocalStorageData {

	constructor(key) {
		this.key = key
	}

	get() {
		const v = localStorage.getItem(this.key)
		return v ? JSON.parse(v) : null
	}

	set(v) {
		localStorage.setItem(this.key, JSON.stringify(v))
		return v
	}
}

class IconStorage {

	txt = ""

	async init() {
		let response = await fetch("https://pictogrammers.github.io/@mdi/font/6.1.95/")
		this.txt = await response.text()
	}

	has(v) {
		return this.txt.indexOf(`name:"${ v }"`) !== -1
	}

	match(v) {
		const str = _.escapeRegExp(v)
		const regexp = new RegExp(`name:"${str}[\\w\-]*"`)
		return !!this.txt.match(regexp)
	}
}

function createAvatar(emp) {
	if (!emp.avatar) emp.avatar = { icon: "account", color: "white" }
}

export const iconStorage = new IconStorage()

const empStore = new LocalStorageData("empStore")
const empProfile = new LocalStorageData("empProfile")

// api

// try catch для всех методов API?

export function getEmpStore() {
	const es = empStore.get()
	return _.forEach(es, createAvatar)
}

export function setEmpStore(v) {
	empStore.set(v)
}

export function getEmpProfile() {
	let emp = empProfile.get()
	_.isEmpty(emp)
		? emp = cleanEmp
		: createAvatar(emp)
	return emp
}

export function setEmpProfile(v) {
	empProfile.set(v)
}

export function hasIcon(v) {
	return iconStorage.has(v)
}

export function matchIcon(v) {
	return iconStorage.match(v)
}

export async function getPosts(n) {
	const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10")
	return response.data
}


//TODO??? cache

class LocalStorage {
	cache = {}

	constructor(keys) {
		keys.forEach(key => {
			const store = new LocalStorageData(key)

			Object.defineProperty(this, key, {
				get() {
					const v = this.cache[key]
					if (v) return v //^
					return this.cache[key] = store.get()
				},

				set(value) {
					this.cache[key] = store.set(value)
				},
			})
		})
	}
}

export const myLocalStorage = new LocalStorage([ "empStore", "empProfile" ])
