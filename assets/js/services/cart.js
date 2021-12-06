import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { renderIcon } from '../components/renderIcon.js'

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
		const html = parseHTML(renderIcon('plus'))
		this.replaceChildren(nonIcon ? 'Add to Cart' : html)
	} else {
		addToCart(id)
		const html = parseHTML(renderIcon('minus'))
		this.replaceChildren(nonIcon ? 'Remove from Cart' : html)
	}
}
