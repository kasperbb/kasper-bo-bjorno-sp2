import { parseHTML } from '../utils/parseHTML.js'
import { productCard } from '../components/productCard.js'
import { getCartItems, removeFromCart } from '../services/cart.js'
import { loadPage } from '../components/preloader.js'

const container = document.querySelector('body#cart #cartContainer')

const setCartItems = async () => {
	const cartItems = await getCartItems()
	console.log(cartItems)

	if (!cartItems) {
		const html = parseHTML(`
			<p>No items in your cart.</p>
		`)
		container.append(html)
		return loadPage()
	}

	cartItems.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})

	const buttons = document.querySelectorAll('.cart-button')

	buttons.forEach(button => {
		button.addEventListener('click', setEvents)
	})
}

function setEvents() {
	removeFromCart(this.dataset.id)
	this.parentElement.remove()
}

loadPage(setCartItems())
