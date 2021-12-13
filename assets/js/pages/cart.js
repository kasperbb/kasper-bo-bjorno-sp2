import { parseHTML } from '../utils/parseHTML.js'
import { productCard } from '../components/productCard.js'
import { getCartItems, getCart } from '../services/cart.js'
import { loadPage } from '../utils/loadPage.js'

const container = document.querySelector('body#cart #cartContainer')

const noItems = parseHTML(`
	<p>No items in your cart.</p>
`)

const setCartItems = async () => {
	const cartItems = await getCartItems()

	if (!cartItems) {
		container.append(noItems)
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
	const cart = getCart()
	this.parentElement.remove()

	// Cart length will be equal to 1 at the point of clicking the last item
	if (cart.length === 1) {
		container.append(noItems)
	}
}

loadPage(setCartItems())
