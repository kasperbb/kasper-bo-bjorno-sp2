import { logout, isAuthenticated } from '../../services/auth.js'
import { renderIcon } from '../../utils/renderIcon.js'
import { parseHTML } from '../../utils/parseHTML.js'

let open = false

if (!isAuthenticated) {
	window.location = '/index.html'
}

const logoutButton = document.querySelector('#logoutButton')
logoutButton.addEventListener('click', logout)

const toggleAdminNav = document.querySelector('#toggleAdminNav')
const toggleAdminNavButton = document.querySelector('#toggleAdminNavButton')

toggleAdminNavButton.addEventListener('click', () => {
	open = !open
	toggleAdminNav.classList.toggle('hidden')
	const html = parseHTML(open ? renderIcon('x') : renderIcon('menu'))
	toggleAdminNavButton.replaceChildren(html)
})
