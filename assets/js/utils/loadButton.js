import { parseHTML } from './parseHTML.js'
import { loader } from '../components/loader.js'

let prevContent = null

export const loadButton = {
	start: button => {
		prevContent = button.textContent
		button.replaceChildren(parseHTML(loader))
	},
	stop: button => {
		button.textContent = prevContent
		prevContent = null
	},
}
