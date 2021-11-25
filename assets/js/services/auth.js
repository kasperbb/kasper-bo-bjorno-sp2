export const setUser = user => {
	localStorage.setItem('user', JSON.stringify(user))
	return JSON.parse(localStorage.getItem('user'))
}

export const getUser = () => {
	return JSON.parse(localStorage.getItem('user'))
}

export const getJWT = () => {
	return JSON.parse(localStorage.getItem('jwt'))
}

export const authenticated = () => {
	const user = getUser()
	return user?.role.name === 'Authenticated'
}

export const setToken = token => {
	localStorage.setItem('jwt', JSON.stringify(token))
	return JSON.parse(localStorage.getItem('jwt'))
}

export const logout = () => {
	localStorage.removeItem('jwt')
	localStorage.removeItem('user')
	window.location = '/index.html'
}

export const isAuthenticated = authenticated()
