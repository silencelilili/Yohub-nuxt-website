module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
	rules: {
		'vue/no-v-html': 'off',
		'vue/v-on-event-hyphenation': 0,
		'vue/no-template-shadow': 0,
		'vue/no-setup-props-destructure': 'off',
		'@intlify/vue-i18n/no-html-messages': 'off',
		'vue/multi-word-component-names': 0,
	},
}
