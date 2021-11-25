import { setCartEvents } from '../services/cart.js'
const preloader = document.querySelector('#preloader')

const removePreloader = () => {
	const fadeOut = setInterval(() => {
		// if we don't set opacity 1 in CSS, then
		// it will be equaled to "" -- that's why
		// we check it, and if so, set opacity to 1
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
	await Promise.all(args)
	setCartEvents()
	removePreloader()
}
