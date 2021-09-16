//

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

//

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
