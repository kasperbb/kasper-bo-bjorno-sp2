import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { setDocumentTitle } from '../utils/setDocumentTitle.js'
import { loadPage } from '../utils/loadPage.js'
import { productDetails } from '../components/productDetails.js'
import { productCard } from '../components/productCard.js'

const params = new URLSearchParams(window.location.search)
const ID = params.get('id')

const container = document.querySelector('body#product main')
const relatedProductsContainer = document.querySelector('body#product #relatedProductsContainer')

const getProduct = async () => {
	const res = await fetch(`${API_URL}/products/${ID}`)
	const json = await res.json()

	const html = parseHTML(productDetails(json))
	container.append(html)

	setDocumentTitle(json.title)

	const related = await getRelatedProducts(json.category.id, json.id)

	related.forEach(product => {
		const html = parseHTML(productCard(product))
		relatedProductsContainer.append(html)
	})
}

const getRelatedProducts = async (categoryId, productId, limit = 4) => {
	const query = categoryId ? `?_where[category.id]=${categoryId}&_limit=${limit + 1}` : ''
	const res = await fetch(`${API_URL}/products${query}`)
	const json = await res.json()

	const filtered = json.filter(product => {
		return product.id !== productId
	})

	if (filtered.length === limit + 1) {
		return filtered.slice(0, limit)
	}

	return filtered
}

const zoomIn = e => {
	const productImg = document.querySelector('#productImg')
	const preview = document.querySelector('#preview')

	if (!preview.style.backgroundImage) {
		preview.style.backgroundImage = `url('${e.target.src}')`
	}

	preview.style.display = 'block'
	const posX = e.offsetX ? e.offsetX : e.pageX - productImg.offsetLeft
	const posY = e.offsetY ? e.offsetY : e.pageY - productImg.offsetTop
	preview.style.backgroundPosition = `${-posX * 1.2}px ${-posY * 0.5}px`
}

const zoomOut = () => {
	const preview = document.querySelector('#preview')
	preview.style.display = 'none'
}

loadPage(getProduct()).then(() => {
	const productImg = document.querySelector('#productImg')
	productImg.addEventListener('mousemove', zoomIn)
	productImg.addEventListener('mouseleave', zoomOut)
})
