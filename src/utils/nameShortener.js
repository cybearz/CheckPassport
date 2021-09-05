export function nameShortener(fullName) {
	let [surname, name, midName] = fullName.split(" ")
	surname = surname.toLowerCase()
	surname = surname[0].toUpperCase() + surname.slice(1)
	return `${surname} ${name[0].toUpperCase()}. ${midName[0].toUpperCase()}.`
}
