import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { setProducts } from '../services/products.js'
import { loadPage } from '../components/loadPage.js'
import { setCartEvents } from '../services/cart.js'
import { loader } from '../components/loader.js'
import { productCard } from '../components/productCard.js'

const container = document.querySelector('body#products #productsContainer')
const sortSelect = document.querySelector('body#products #sort')
const form = document.querySelector('body#products #filterForm')

const query = []
let sortVal = ''

const params = new URLSearchParams(window.location.search)
const categoryId = params.get('category')

if (categoryId) {
	query.push(`?_where[category.id]=${categoryId}`)
}

const getCategories = async () => {
	const list = document.querySelector('body#products #categoryList')
	const res = await fetch(API_URL + '/categories')
	const categories = await res.json()

	categories.forEach(({ id, name }) => {
		console.log(+categoryId === +id)
		const html = parseHTML(`
			<li class="flex items-center gap-1">
				<input type="checkbox" name="category_${id}" id="category_${id}" value="${id}" 
					${+categoryId === +id ? `checked` : ''} 
				/>
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

	reloadProducts()
}

const sort = e => {
	sortVal = e.target.value
	reloadProducts()
}

const clearForm = e => {
	e.preventDefault()

	Array.from(form.elements).forEach(el => {
		el.checked = false
	})
	query.splice(0, query.length)

	reloadProducts()
}

form.addEventListener('change', filter)
form.addEventListener('submit', clearForm)
sortSelect.addEventListener('change', sort)

loadPage(getCategories(), getBrands(), setProducts(`${query.join('&')}`, container))
