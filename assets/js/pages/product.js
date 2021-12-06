import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { productDetails } from '../components/productDetails.js'
import { productCard } from '../components/productCard.js'
import { loadPage } from '../components/loadPage.js'

const params = new URLSearchParams(window.location.search)
const ID = params.get('id')

const container = document.querySelector('body#product main')
const relatedProductsContainer = document.querySelector('body#product #relatedProductsContainer')

const getProduct = async () => {
	const res = await fetch(`${API_URL}/products/${ID}`)
	const json = await res.json()

	const html = parseHTML(productDetails(json))
	container.append(html)

	const related = await getRelatedProducts(json.category.id, json.id)

	related.forEach(product => {
		const html = parseHTML(productCard(product))
		relatedProductsContainer.append(html)
	})
}

const getRelatedProducts = async (categoryId, productId, limit = 4) => {
	const limitPlusOne = limit + 1
	const query = categoryId ? `?_where[category.id]=${categoryId}&_limit=${limitPlusOne}` : ''
	const res = await fetch(`${API_URL}/products${query}`)
	const json = await res.json()

	const filtered = json.filter(product => {
		return product.id !== productId
	})

	if (filtered.length === limitPlusOne) {
		return filtered.slice(0, limit)
	}

	return filtered
}

loadPage(getProduct())
