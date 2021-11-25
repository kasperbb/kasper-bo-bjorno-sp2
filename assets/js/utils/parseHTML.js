const parser = new DOMParser()

export const parseHTML = htmlString => {
	return parser.parseFromString(htmlString, 'text/html').body.firstChild
}
