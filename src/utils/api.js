// class LocalStorage {
// 	constructor() {
// 		for (let i = 0; i < localStorage.length; i++) {
// 			let key = localStorage.key(i)
// 			this[key] = JSON.stringify(localStorage.getItem(key))
// 			Object.defineProperty(this, key, {
//
// 			})
// 		}
// 	}
//
// 	setVal(key, str) {
// 		const parsed = JSON.parse(str)
// 		this[key] = parsed
// 		localStorage.setItem(key, parsed)
// 	}
// }

class LocalStorage {
	empStore = localStorage.getItem("empStore") ? JSON.parse(localStorage.getItem("empStore")) : null
	empProfile = localStorage.getItem("empProfile") ? JSON.parse(localStorage.getItem("empProfile")) : null


	setEmpStore(json) {
		console.log(json)
		this.empStore = json
		const parsed = JSON.stringify(json)
		localStorage.setItem("empStore", parsed)
	}

	setEmpProfile(json) {
		this.empStore = json
		const parsed = JSON.stringify(json)
		localStorage.setItem("empProfile", parsed)
	}
}

const myLocalStorage = new LocalStorage()

export {myLocalStorage}
