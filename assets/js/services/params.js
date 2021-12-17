export const params = new URLSearchParams(window.location.search)
export const getParam = key => params.get(key)

export const setParam = (key, val) => {
	params.append(key, val)
	const newQueryPath = window.location.pathname + '?' + params.toString()
	history.pushState(null, '', newQueryPath)
}

export const removeParam = (key, value) => {
	const allParams = params.getAll(key).filter(el => el !== value)

	params.delete(key)

	allParams.forEach(el => {
		params.append(key, el)
	})

	const newQueryPath = window.location.pathname + '?' + params.toString()
	history.pushState(null, '', newQueryPath)
}

export const removeParamsByKey = key => {
	params.delete(key)
	const newQueryPath = window.location.pathname + '?' + params.toString()
	history.pushState(null, '', newQueryPath)
}

export const getParams = () => {
	return Array.from(params).map(param => param)
}
