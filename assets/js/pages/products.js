import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { setProducts } from '../services/products.js'
import { loadPage } from '../components/loadPage.js'
import { loader } from '../components/loader.js'
import { productCard } from '../components/productCard.js'

const container = document.querySelector('body#products #productsContainer')
const clearButton = document.querySelector('body#products #clearButton')
const sortSelect = document.querySelector('body#products #sort')
const form = document.querySelector('body#products #filterForm')

// const params = new URLSearchParams(window.location.search)
// const category = params.get('category')
// const query = category ? `?_where[category.id]=${category}` : ''

const query = []
let sortVal = ''

const getCategories = async () => {
	const list = document.querySelector('body#products #categoryList')
	const res = await fetch(API_URL + '/categories')
	const categories = await res.json()

	categories.forEach(({ id, name }) => {
		const html = parseHTML(`
			<li class="flex items-center gap-1">
				<input type="checkbox" name="category_${id}" id="category_${id}" value="${id}" />
				<label for="category_${id}">${name}</label>
			</li>
		`)
		list.append(html)
	})
}

const getBrands = async () => {
	const list = document.querySelector('body#products #brandList')
	const res = await fetch(API_URL + '/brands')
	const brands = await res.json()

	brands.forEach(({ id, name }) => {
		const html = parseHTML(`
			<li class="flex items-center gap-1">
				<input type="checkbox" name="brand_${id}" id="brand_${id}" value="${id}" />
				<label for="brand_${id}">${name}</label>
			</li>
		`)
		list.append(html)
	})
}

const reloadProducts = async () => {
	const html = parseHTML(loader)
	container.replaceChildren(html)

	const sortQuery = sortVal ? `&_sort=${sortVal}` : ``

	const res = await fetch(API_URL + `/products?${query.join('&')}${sortQuery}`)
	const products = await res.json()

	container.textContent = ''

	products.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})
}

const filter = e => {
	const [type, value, checked] = [e.target.name.split('_')[0], e.target.value, e.target.checked]

	if (type === 'category') {
		if (checked) {
			query.push(`_where[category.id]=${value}`)
		} else {
			const index = query.indexOf(`_where[category.id]=${value}`)
			query.splice(index, 1)
		}
	}

	if (type === 'brand') {
		if (checked) {
			query.push(`_where[brand.id]=${value}`)
		} else {
			const index = query.indexOf(`_where[brand.id]=${value}`)
			query.splice(index, 1)
		}
	}
}

const sort = e => {
	sortVal = e.target.value
	reloadProducts()
}

const submitForm = async e => {
	e.preventDefault()
	reloadProducts()
}

const clearForm = () => {
	Array.from(form.elements).forEach(el => {
		el.checked = false
	})
	query.splice(0, query.length)
	reloadProducts()
}

form.addEventListener('change', filter)
form.addEventListener('submit', submitForm)
sortSelect.addEventListener('change', sort)
clearButton.addEventListener('click', clearForm)

loadPage(getCategories(), getBrands(), setProducts(query, container))
