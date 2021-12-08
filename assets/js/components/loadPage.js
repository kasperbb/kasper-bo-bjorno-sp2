import { setCartEvents } from '../services/cart.js'
import { updateCartCount } from '../services/cart.js'
import { parseHTML } from '../utils/parseHTML.js'

const removePreloader = () => {
	const preloader = document.querySelector('#preloader')
	const fadeOut = setInterval(() => {
		if (!preloader.style.opacity) {
			preloader.style.opacity = 1
		}

		if (preloader.style.opacity > 0) {
			preloader.style.opacity -= 0.25
		} else {
			preloader.remove()
			clearInterval(fadeOut)
		}
	}, 100)
}

// 1. Takes an array of asynchronous functions as a parameter.
// 2. Exectutes those functions.
// 3. Waits until they are done, then removes the preloader effect.
export const loadPage = async (...args) => {
	if (!args.length) return removePreloader()

	try {
		const res = await Promise.all(args)
		setCartEvents()
		updateCartCount()
		removePreloader()
		return res
	} catch (err) {
		const preloader = document.querySelector('#preloader')
		const html = parseHTML(`<p class="alert alert--error p-5">Oops! Something went wrong, try again later.</p>`)
		preloader.replaceChildren(html)
	}
}
