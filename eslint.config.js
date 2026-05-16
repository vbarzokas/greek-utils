'use strict';

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
	{
		ignores: ['node_modules/**', 'lib/**', 'src/**', 'coverage/**']
	},
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'commonjs',
			globals: {
				...globals.node,
				...globals.browser,
				...globals.mocha
			}
		},
		rules: {
			indent: ['error', 'tab'],
			'no-tabs': 'off',
			'one-var': 'off',
			semi: ['error', 'always'],
			'space-before-function-paren': ['error', {
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always'
			}]
		}
	},
	{
		files: ['lib/index.mjs'],
		languageOptions: {
			sourceType: 'module'
		}
	}
];
