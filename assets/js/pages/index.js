import { API_URL } from '../constants/index.js'
import { loadPage } from '../components/loadPage.js'
import { setProducts } from '../services/products.js'

const header = document.querySelector('body#home header')
const featured = document.querySelector('body#home section#featured #featuredContainer')

const getHeaderImage = async () => {
	const res = await fetch(API_URL + '/home')
	const json = await res.json()
	header.style.backgroundImage = `url(${json.hero_banner.url})`
}

loadPage(getHeaderImage(), setProducts('?featured=true', featured))
