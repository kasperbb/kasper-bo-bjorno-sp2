const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nested'),
		require('tailwindcss'),
		require('autoprefixer'),
		process.env.NETLIFY &&
			cssnano({
				preset: 'default',
			}),
		process.env.NETLIFY &&
			purgecss({
				globs: ['node_modules/postcss-import/**/*.js', 'node_modules/postcss-nested/**/*.js'],
				content: ['**/*.html', 'assets/js/**/*.js'],
				css: ['assets/css/**/*.css'],
				defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
			}),
	],
}
