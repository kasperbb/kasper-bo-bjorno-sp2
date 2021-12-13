import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { getJWT } from './auth.js'
import { productCard } from '../components/productCard.js'
import { adminProductCard } from '../components/adminProductCard.js'

export const getProducts = async (query = '') => {
	const res = await fetch(`${API_URL}/products${query}`)
	return await res.json()
}

export const setProducts = async (query, container, isAdmin) => {
	const products = await getProducts(query)

	if (!products.length) {
		const html = parseHTML(`
			<p class="col-span-3 font-primary font-medium">No products found</p>
		`)
		return container.append(html)
	}

	products.forEach(product => {
		const html = parseHTML(isAdmin ? adminProductCard(product) : productCard(product))
		container.append(html)
	})

	return products
}

export const getProduct = async query => {
	const res = await fetch(API_URL + query)
	return await res.json()
}

export const addProduct = async body => {
	const res = await fetch(`${API_URL}/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getJWT()}`,
		},
		body: JSON.stringify(body),
	})
	return await res.json()
}

export const editProduct = async (id, body) => {
	const res = await fetch(`${API_URL}/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getJWT()}`,
		},
		body: JSON.stringify(body),
	})
	return await res.json()
}

export async function deleteProduct() {
	const id = this.dataset.id

	const isSure = window.confirm('Are you sure?')

	if (!isSure) {
		return
	}

	try {
		await fetch(`${API_URL}/products/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${getJWT()}`,
			},
		})
		this.parentElement.parentElement.parentElement.remove()
	} catch (err) {
		console.log(err)
	}
}
