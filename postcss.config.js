// const purgecss = require('@fullhuman/postcss-purgecss')
// const cssnano = require('cssnano')

module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nested'),
		require('tailwindcss'),
		require('autoprefixer'),
		// cssnano({
		// 	preset: 'default',
		// }),
		// purgecss({
		// 	globs: ['node_modules/postcss-import/**/*.js', 'node_modules/postcss-nested/**/*.js'],
		// 	content: ['**/*.html', 'assets/js/**/*.js'],
		// 	css: ['assets/css/**/*.css'],
		// 	defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
		// }),
	],
}
