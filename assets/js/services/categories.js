import { API_URL } from '../constants/index.js'

export const getCategories = async (query = '') => {
	const res = await fetch(`${API_URL}/categories${query}`)
	return await res.json()
}
