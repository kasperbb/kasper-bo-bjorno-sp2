import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { loadPage } from '../utils/loadPage.js'
import { setProducts, getProducts } from '../services/products.js'
import { setCartEvents } from '../services/cart.js'
import { removeParamsByKey, setParam, removeParam, getParams } from '../services/params.js'
import { productCard, productCardSkeleton } from '../components/productCard.js'

const container = document.querySelector('body#products #productsContainer')
const sortSelect = document.querySelector('body#products #sort')
const form = document.querySelector('body#products #filterForm')

const query = []
let sortVal = ''

let length = 0

const params = getParams()
const brandIds = []
const categoryIds = []

if (params.length) {
	params.forEach(param => {
		const [type, val] = param

		if (type === 'category') categoryIds.push(val)
		if (type === 'brand') brandIds.push(val)

		query.push(`_where[${type}.id]=${val}`)
	})
}

const getCategories = async () => {
	const list = document.querySelector('body#products #categoryList')
	const res = await fetch(API_URL + '/categories')
	const categories = await res.json()

	categories.forEach(({ id, name }) => {
		const html = parseHTML(`
			<li class="flex items-center gap-1">
				<input type="checkbox" name="category_${id}" id="category_${id}" value="${id}" 
					${categoryIds.includes(id.toString()) ? `checked` : ''} 
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
				<input type="checkbox" name="brand_${id}" id="brand_${id}" value="${id}"
					${brandIds.includes(id.toString()) ? `checked` : ''} 
				/>
				<label for="brand_${id}">${name}</label>
			</li>
		`)
		list.append(html)
	})
}

const reloadProducts = async () => {
	const skeletons = Array.from(Array(length).slice(0, 9)).map(() => parseHTML(productCardSkeleton))
	container.replaceChildren(...skeletons)

	const sortQuery = sortVal ? `&_sort=${sortVal}` : ``
	const products = await getProducts(`?${query.join('&')}${sortQuery}`)

	container.textContent = ''

	if (!products.length) {
		const html = parseHTML(`
			<p class="col-span-3 font-primary font-medium">No products found</p>
		`)
		return container.append(html)
	}

	length = products.length

	products.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})

	setCartEvents()
}

const filter = e => {
	const [type, value, checked] = [e.target.name.split('_')[0], e.target.value, e.target.checked]

	if (checked) {
		query.push(`_where[${type}.id]=${value}`)
		setParam(type, value)
	} else {
		const index = query.indexOf(`_where[${type}.id]=${value}`)
		query.splice(index, 1)
		removeParam(type, value)
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

	removeParamsByKey('category')
	removeParamsByKey('brand')

	reloadProducts()
}

form.addEventListener('change', filter)
form.addEventListener('submit', clearForm)
sortSelect.addEventListener('change', sort)

loadPage(getCategories(), getBrands(), setProducts(`?${query.join('&')}`, container)).then(res => {
	length = res[2].length
})
