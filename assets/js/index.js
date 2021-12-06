import { parseHTML } from './utils/parseHTML.js'
import { navBar } from './components/navBar.js'
import { logout } from './services/auth.js'

const body = document.querySelector('body')

const nav = parseHTML(navBar())
body.insertBefore(nav, body.firstChild)

if (nav) {
	const logoutButtons = document.querySelectorAll('.logout-button')
	const navMenuButton = document.querySelector('#navMenuButton')
	const navMenuCloseButton = document.querySelector('#navMenuCloseButton')
	const navMenu = document.querySelector('#navMenu')

	if (logoutButtons) {
		logoutButtons.forEach(btn => {
			btn.addEventListener('click', logout)
		})
	}

	if (navMenuButton) {
		navMenuButton.addEventListener('click', () => {
			navMenu.classList.toggle('hidden')
		})
	}

	if (navMenuCloseButton) {
		navMenuCloseButton.addEventListener('click', () => {
			navMenu.classList.add('hidden')
		})
	}
}
