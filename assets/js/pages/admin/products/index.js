import { adminProductCard } from '../../../components/adminProductCard.js'
import { API_URL } from '../../../constants/index.js'
import { parseHTML } from '../../../utils/parseHTML.js'
import { getJWT } from '../../../services/auth.js'

const container = document.querySelector('body#adminProducts #productsContainer')

const getProducts = async () => {
	const res = await fetch(API_URL + '/products')
	const json = await res.json()

	console.log(json)

	json.forEach(product => {
		const html = parseHTML(adminProductCard(product))
		container.append(html)
	})

	deleteEvents()
}

const deleteEvents = () => {
	const buttons = document.querySelectorAll('.delete-product-button')
	buttons.forEach(button => {
		button.addEventListener('click', deleteProduct)
	})
}

async function deleteProduct() {
	const id = this.dataset.id

	window.confirm('Are you sure?')

	try {
		await fetch(`${API_URL}/products/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${getJWT()}`,
			},
		})
	} catch (err) {
		console.log(err)
	} finally {
		this.parentElement.parentElement.remove()
	}
}

getProducts()
