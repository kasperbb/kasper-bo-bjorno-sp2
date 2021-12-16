import { parseHTML } from '../../../utils/parseHTML.js'
import { validateForm } from '../../../utils/validateForm.js'
import { loadPage } from '../../../utils/loadPage.js'
import { addProduct } from '../../../services/products.js'
import { getCategories } from '../../../services/categories.js'
import { getBrands } from '../../../services/brands.js'
import { loadButton } from '../../../utils/loadButton.js'

const form = document.querySelector('body#adminProductsAdd #addForm')
const alert = document.querySelector('body#adminProductsAdd #alert')
const image = document.querySelector('body#adminProductsAdd input[type="file"]')
const fileName = document.querySelector('#fileName')

const setCategories = async () => {
	const container = document.querySelector('body#adminProductsAdd select[name="category"]')
	const categories = await getCategories()
	categories.forEach(({ name, id }) => {
		const html = parseHTML(`
			<option value="${id}">${name}</option>
		`)
		container.append(html)
	})
}

const setBrands = async () => {
	const container = document.querySelector('body#adminProductsAdd select[name="brand"]')
	const brands = await getBrands()
	brands.forEach(({ name, id }) => {
		const html = parseHTML(`
			<option value="${id}">${name}</option>
		`)
		container.append(html)
	})
}

const submitForm = async e => {
	e.preventDefault()
	alert.classList.add('hidden')

	const valid = validateForm(form, {
		title: { minLength: 3 },
		price: { numeric: true },
		sale_price: { numeric: true },
		stock: { numeric: true },
	})

	if (!valid) return

	const formElements = form.elements
	const formData = new FormData()
	const data = {}
	let submitButton = null

	Array.from(formElements).forEach(el => {
		if (!['submit', 'file'].includes(el.type)) {
			data[el.name] = el.value
		}

		if (el.type === 'file') {
			Array.from(el.files).forEach(file => {
				formData.append(`files.${el.name}`, file, file.name)
			})
		}

		if (el.type === 'submit') submitButton = el
	})

	formData.append('data', JSON.stringify(data))

	loadButton.start(submitButton)
	const res = await addProduct(formData)
	loadButton.stop(submitButton)

	setAlert(res)
}

const setFileName = e => {
	fileName.textContent = Array.from(e.target.files)
		.map(el => el.name)
		.join(', ')
}

const setAlert = ({ error, message, statusCode, title }) => {
	if (error) {
		alert.classList.remove('hidden')
		alert.classList.add('alert--error')
		alert.textContent = `ERROR: ${statusCode} (${error}) ${message}`
	} else {
		alert.classList.remove('hidden')
		alert.classList.add('alert--success')
		alert.textContent = `${title} successfully created!`
	}
}

const setEvents = () => {
	form.addEventListener('submit', submitForm)
	image.addEventListener('change', setFileName)
}

loadPage(setBrands(), setCategories()).then(() => {
	setEvents()
})
