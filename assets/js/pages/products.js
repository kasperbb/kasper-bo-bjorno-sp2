import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { getProducts } from '../services/products.js'
import { loadPage } from '../components/preloader.js'

const container = document.querySelector('body#products #productsContainer')
const list = document.querySelector('body#products #categoryList')

const params = new URLSearchParams(window.location.search)
const category = params.get('category')

const setProducts = async () => {
	const query = category ? `?_where[categories.id]=${category}` : ''
	getProducts(`/products${query}`, container)
}

const getCategories = async () => {
	const res = await fetch(API_URL + '/categories')
	const categories = await res.json()

	categories.forEach(({ id, name }) => {
		const html = parseHTML(`
			<li>
				<a href="products.html?category=${id}">${name}</a>
			</li>
		`)
		list.append(html)
	})
}

loadPage(setProducts(), getCategories())
