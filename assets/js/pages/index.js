import { API_URL } from '../constants/index.js'
import { loadPage } from '../utils/loadPage.js'
import { setProducts } from '../services/products.js'
import { setCategories } from '../services/categories.js'

const header = document.querySelector('body#home header')
const featured = document.querySelector('body#home section#featured #featuredContainer')
const categories = document.querySelector('body#home #categoriesContainer')

const getHeaderImage = async () => {
	const res = await fetch(API_URL + '/home')
	const json = await res.json()
	header.style.backgroundImage = `url(${json.hero_banner.url})`
}

loadPage(getHeaderImage(), setProducts('?featured=true', featured), setCategories('?featured=true', categories))
