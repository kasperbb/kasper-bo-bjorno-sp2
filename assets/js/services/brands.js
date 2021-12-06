import { API_URL } from '../constants/index.js'

export const getBrands = async (query = '') => {
	const res = await fetch(`${API_URL}/brands${query}`)
	return await res.json()
}
