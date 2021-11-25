import { API_URL } from '../constants/index.js'
import { setToken, setUser } from '../services/auth.js'
import { loadPage } from '../components/preloader.js'
import { validateForm } from '../components/validateForm.js'

const form = document.querySelector('body#login #loginForm')
const error = document.querySelector('body#login #loginFormError')

// const validateForm = e => {
// 	const [email, password] = e.target

// 	if (!email.value.length || !password.value.length) {
// 		console.log('Please fill out all the fields.')
// 		return false
// 	}

// 	return true
// }

const login = async e => {
	e.preventDefault()

	// const validForm = validateForm(e)
	// if (!validForm) return

	const valid = validateForm(form, {
		username: { required: true },
		password: { required: true },
	})

	if (!valid) return

	const [username, password] = e.target
	const body = {
		identifier: username.value,
		password: password.value,
	}

	try {
		const res = await fetch(`${API_URL}/auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const { jwt, user, message } = await res.json()

		if (message) {
			throw new Error(message[0].messages[0].message)
		}

		setToken(jwt)
		setUser(user)

		window.location = './admin/products/index.html'
	} catch (err) {
		console.log(err)
		error.textContent = err
	}
}

form.addEventListener('submit', login)
loadPage()