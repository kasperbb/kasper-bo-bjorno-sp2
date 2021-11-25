import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'

export const getCart = () => {
	return JSON.parse(localStorage.getItem('cart')) || []
}

export const addToCart = productId => {
	const cart = getCart()
	if (cart.includes(productId)) return

	localStorage.setItem('cart', JSON.stringify([...cart, productId]))
}

export const removeFromCart = productId => {
	const cart = getCart()
	localStorage.setItem('cart', JSON.stringify(cart.filter(id => id !== productId)))
}

export const getCartItems = async () => {
	const cart = getCart()

	if (!cart.length) {
		return
	}

	const idString = cart.map(id => `id_in=${id}`).join('&')
	const res = await fetch(API_URL + `/products?${idString}`)
	return await res.json()
}

export const setCartEvents = () => {
	const buttons = document.querySelectorAll('.cart-button')

	buttons.forEach(button => {
		button.addEventListener('click', cartEvent)
	})
}

export const alreadyInCart = id => {
	const cart = getCart()
	return cart.includes(id.toString())
}

function cartEvent() {
	const id = this.dataset.id
	const nonIcon = this.dataset.type === 'nonIcon'

	if (alreadyInCart(id)) {
		removeFromCart(id)
		const html = parseHTML(`
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
			</svg>
		`)
		this.replaceChildren(nonIcon ? 'Add to Cart' : html)
	} else {
		addToCart(id)
		const html = parseHTML(`
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
			</svg>
		`)
		this.replaceChildren(nonIcon ? 'Remove from Cart' : html)
	}
}
