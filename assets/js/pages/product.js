import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { productDetails } from '../components/productDetails.js'
import { loadPage } from '../components/preloader.js'
import { setCartEvents } from '../services/cart.js'

const params = new URLSearchParams(window.location.search)
const ID = params.get('id')

const container = document.querySelector('body#product main')

const getProduct = async () => {
	const res = await fetch(`${API_URL}/products/${ID}`)
	const json = await res.json()

	const html = parseHTML(productDetails(json))
	container.append(html)
}

loadPage(getProduct())
