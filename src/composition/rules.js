const RULES = {
	nameRules: [
		v => !!v || "Введите имя",
		v => /^( *[a-zA-Zа-яА-ЯёЁ]{2,} +[a-zA-Zа-яА-ЯёЁ]{2,} +[a-zA-Zа-яА-ЯёЁ]{2,} *)+$/.test(v) || "Пример: Иванов Иван Иванович."
	],
	serRules: [
		v => !!v || "Введите серию",
		v => /^( *\d{4} *)+$/.test(v) || "Пример: 1210."
	],
	nomRules: [
		v => !!v || "Введите номер",
		v => /^( *\d{6} *)+$/.test(v) || "Пример: 111111."
	],
	dtRules: [
		v => !!v || "Введите дату"
	]
}

export function useRules() {
	return RULES
}
