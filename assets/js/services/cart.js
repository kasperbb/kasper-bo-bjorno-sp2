import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { renderIcon } from '../components/renderIcon.js'

export const getCart = () => {
	return JSON.parse(localStorage.getItem('cart')) || []
}

let cartCount = getCart().length

export const getCartCount = () => {
	return getCart().length
}

export const updateCartCount = () => {
	const cartCounts = document.querySelectorAll('.cart-count')

	cartCounts.forEach(el => {
		el.textContent = getCartCount()
	})
}

export const addToCart = productId => {
	const cart = getCart()
	if (cart.includes(productId)) return

	localStorage.setItem('cart', JSON.stringify([...cart, productId]))
	updateCartCount()
}

export const removeFromCart = productId => {
	const cart = getCart()
	localStorage.setItem('cart', JSON.stringify(cart.filter(id => id !== productId)))
	updateCartCount()
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
	const bag = parseHTML(renderIcon('shoppingBag')),
		plus = parseHTML(renderIcon('plus', 'w-3 h-3')),
		minus = parseHTML(renderIcon('minus', 'w-3 h-3'))

	if (alreadyInCart(id)) {
		removeFromCart(id)
		this.classList.remove('remove')
		if (nonIcon) return this.replaceChildren('Add to Cart')
		this.replaceChildren(bag, plus)
	} else {
		addToCart(id)
		this.classList.add('remove')
		if (nonIcon) return this.replaceChildren('Remove from Cart')
		this.replaceChildren(bag, minus)
	}
}
