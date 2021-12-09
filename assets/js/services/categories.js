import { API_URL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { category } from '../components/category.js'

export const getCategories = async (query = '') => {
	const res = await fetch(`${API_URL}/categories${query}`)
	return await res.json()
}

export const setCategories = async (query, container) => {
	const categories = await getCategories(query)
	console.log(categories)
	if (!categories.length) {
		const html = parseHTML(`
			<p class="col-span-3 font-primary font-medium">No categories found</p>
		`)
		return container.append(html)
	}

	categories.forEach(el => {
		const html = parseHTML(category(el))
		container.append(html)
	})

	return categories
}
