import { logout, isAuthenticated } from '../../services/auth.js'

if (!isAuthenticated) {
	window.location = '/index.html'
}

const logoutButton = document.querySelector('#logoutButton')
logoutButton.addEventListener('click', logout)

const toggleAdminNav = document.querySelector('#toggleAdminNav')
const toggleAdminNavButton = document.querySelector('#toggleAdminNavButton')

toggleAdminNavButton.addEventListener('click', () => {
	toggleAdminNav.classList.toggle('hidden')
})
