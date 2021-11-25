import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { productCard } from '../components/productCard.js'
import { loadPage } from '../components/preloader.js'

const container = document.querySelector('body#results #resultsContainer')
const header = document.querySelector('body#results #resultsHeader')

const params = new URLSearchParams(window.location.search)
const search = params.get('search')

const getSearchResults = async () => {
	const res = await fetch(API_URL + `/products?_where[title_contains]=${search}`)
	const json = await res.json()

	header.textContent += ` ${search}`

	json.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})
}

loadPage(getSearchResults())
