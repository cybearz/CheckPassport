//

class LocalStorageData {

	constructor(key) {
		this.key = key
	}

	get() {
		const v = localStorage.getItem(this.key)
		const rs = v ? JSON.parse(v) : null
		console.debug("get()", this.key, rs) //D
		return rs
	}

	set(v) {
		localStorage.setItem(this.key, JSON.stringify(v))
		console.debug("set()", this.key, v) //D
		return v
	}
}

const empStore = new LocalStorageData("empStore")
const empProfile = new LocalStorageData("empProfile")

// api

export function getEmpStore() {
	return empStore.get()
}

export function setEmpStore(v) {
	empStore.set(v)
}

export function getEmpProfile() {
	return empProfile.get()
}

export function setEmpProfile(v) {
	empProfile.set(v)
}


export async function hasIcon(v) {
	let response = await fetch("https://pictogrammers.github.io/@mdi/font/6.1.95/")
	let txt = await response.text()
	return txt.indexOf(`name:"${v}"`) !== -1
}

//TODO??? cache

class LocalStorage {
	cache = {}

	constructor(keys) {
		keys.forEach(key => {
			const store = new LocalStorageData(key)
// ====================================================================================



		// ====================================================================================
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
