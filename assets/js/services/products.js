import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { productCard } from '../components/productCard.js'
import { setCartEvents } from '../services/cart.js'

export const getProducts = async (query, container) => {
	const res = await fetch(API_URL + query)
	const products = await res.json()

	if (!products.length) {
		const html = parseHTML(`
			<p class="col-span-3 font-primary font-medium">No products found</p>
		`)
		return container.append(html)
	}

	products.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})

	setCartEvents()
}

export const getProduct = async query => {
	const res = await fetch(API_URL + query)
	return await res.json()
}
