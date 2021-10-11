import _ from "lodash"

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

async function newAllIcons() {
	console.log(">>> fetch AllIcons") //D
	let response = await fetch("https://pictogrammers.github.io/@mdi/font/6.1.95/")
	const txt = await response.text()
	return txt
		.match(/name:"[\w\-]*"/g)
		.map( i => i.slice(6, -1))
}

let allIcons

export async function getMdiIcons() {
	return allIcons = allIcons ?? await newAllIcons()
}

export function hasIcon(v) {
	return allIcons?.indexOf(v) !== -1
}

function createAvatar(emp) {
	if (!emp.avatar) emp.avatar = { icon: "account", color: "white" }
}

const empStore = new LocalStorageData("empStore")
const empProfile = new LocalStorageData("empProfile")

// api

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
