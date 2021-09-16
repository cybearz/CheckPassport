if (!localStorage.getItem("empStore")) {
	localStorage.setItem("empStore", "")
}

if (!localStorage.getItem("empStore")) {
	localStorage.setItem("empProfile", "")
}

class LocalStorage {
	ls = {}

	constructor() {
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i)
			Object.defineProperty(this, key, {
				get: function() {
					if (!this.ls[key]) {
						this.ls[key] = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
					}
					return this.ls[key]
				},
				set: function (json) {
					this.ls[key] = json
					const parsed = JSON.stringify(json)
					localStorage.setItem(key, parsed)
				}
			})
		}
	}
}

const myLocalStorage = new LocalStorage()

export {myLocalStorage}
