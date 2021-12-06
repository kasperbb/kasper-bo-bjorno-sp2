module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#1bd1aa',
					DEFAULT: '#1bbb99',
					dark: '#18ab8c',
				},
				secondary: {
					light: '#3c3f4f',
					DEFAULT: '#2d2f3b',
				},
				tertiary: '#61646d',
				muted: '#9e9fa3',
				header: '#c51322',
			},
			fontFamily: {
				primary: ['General Sans', 'sans-serif'],
				secondary: ['Sentient', 'serif'],
				poppins: ['Poppins', 'sans-serif'],
				cta: ['Open Sans Condensed', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
