import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { setDocumentTitle } from '../utils/setDocumentTitle.js'
import { loadPage } from '../utils/loadPage.js'
import { productCard } from '../components/productCard.js'

const container = document.querySelector('body#results #resultsContainer')
const header = document.querySelector('body#results #resultsHeader')

const params = new URLSearchParams(window.location.search)
const search = params.get('search')

const getSearchResults = async () => {
	const res = await fetch(
		API_URL + `/products?_where[_or][0][title_contains]=${search}&_where[_or][1][brand.name_contains]=${search}`
	)
	const results = await res.json()

	header.textContent += ` ${search}`
	setDocumentTitle(`Search: ${search}`)

	if (!results.length) {
		const html = parseHTML(`
			<p class="col-span-3 font-primary font-medium">No results found</p>
		`)
		container.append(html)
	}

	results.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})
}

loadPage(getSearchResults())
