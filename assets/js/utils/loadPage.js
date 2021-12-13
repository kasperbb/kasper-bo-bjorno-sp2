import { parseHTML } from './parseHTML.js'
import { setCartEvents } from '../services/cart.js'
import { updateCartCount } from '../services/cart.js'

const removePreloader = () => {
	const preloader = document.querySelector('#preloader')
	const style = preloader.style
	const fadeOut = setInterval(() => {
		if (!style.opacity) {
			style.opacity = 1
		}

		if (style.opacity > 0) {
			style.opacity -= 0.25
		} else {
			preloader.remove()
			clearInterval(fadeOut)
		}
	}, 100)
}

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
		console.error(err)
	}
}
