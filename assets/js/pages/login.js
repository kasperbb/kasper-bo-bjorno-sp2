import { API_URL } from '../constants/index.js'
import { validateForm } from '../utils/validateForm.js'
import { loadPage } from '../utils/loadPage.js'
import { login, setToken, setUser } from '../services/auth.js'
import { loadButton } from '../utils/loadButton.js'

const form = document.querySelector('body#login #loginForm')
const alert = document.querySelector('#alert')
const submitButton = form.elements[2]

const submitForm = async e => {
	e.preventDefault()

	const valid = validateForm(form, {
		username: { minLength: 3 },
		password: { required: true },
	})

	if (!valid) return

	const [username, password] = e.target

	loadButton.start(submitButton)

	const { message } = await login({
		identifier: username.value,
		password: password.value,
	})

	if (message) {
		setAlert()
	} else {
		window.location = './admin/products/index.html'
	}

	loadButton.stop(submitButton)
}

const setAlert = () => {
	alert.classList.remove('hidden')
	alert.classList.add('alert--error')
	alert.textContent = `Username or password invalid.`
}

form.addEventListener('submit', submitForm)
loadPage()
