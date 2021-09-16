class LocalStorage {
	ls = {}

	constructor(keys) {
		keys.forEach(key => {
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
		})
	}
}

const myLocalStorage = new LocalStorage(["empStore", "empProfile"])

export {myLocalStorage}
