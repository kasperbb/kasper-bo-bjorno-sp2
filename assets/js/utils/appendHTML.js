import { parseHTML } from './parseHTML.js'

export const appendHTML = (htmlString, target) => {
	const html = parseHTML(htmlString)
	target.append(html)
}
