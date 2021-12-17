export const params = new URLSearchParams(window.location.search)
export const getParam = key => params.get(key)

export const setParam = (key, val) => {
	params.append(key, val)
	const newRelativePathQuery = window.location.pathname + '?' + params.toString()
	history.pushState(null, '', newRelativePathQuery)
}

export const removeParam = (key, value) => {
	const arr = params.getAll(key).filter(el => el !== value)

	params.delete(key)

	arr.forEach(el => {
		params.append(key, el)
	})

	const newRelativePathQuery = window.location.pathname + '?' + params.toString()
	history.pushState(null, '', newRelativePathQuery)
}

export const getParams = () => {
	return Array.from(params).map(param => param)
}
