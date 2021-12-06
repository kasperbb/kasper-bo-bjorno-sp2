import { setProducts } from '../../../services/products.js'
import { loadPage } from '../../../components/loadPage.js'
import { deleteProduct } from '../../../services/products.js'

const container = document.querySelector('body#adminProducts #productsContainer')

const deleteEvents = () => {
	const buttons = document.querySelectorAll('.delete-product-button')
	buttons.forEach(button => {
		button.addEventListener('click', deleteProduct)
	})
}

loadPage(setProducts('?_sort=updated_at:DESC', container, true)).then(() => {
	deleteEvents()
})
