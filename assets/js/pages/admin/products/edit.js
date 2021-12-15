import { parseHTML } from '../../../utils/parseHTML.js'
import { setDocumentTitle } from '../../../utils/setDocumentTitle.js'
import { validateForm } from '../../../utils/validateForm.js'
import { loadPage } from '../../../utils/loadPage.js'
import { getProduct } from '../../../services/products.js'
import { editProduct } from '../../../services/products.js'
import { getCategories } from '../../../services/categories.js'
import { getBrands } from '../../../services/brands.js'

const id = new URLSearchParams(window.location.search).get('id')

const header = document.querySelector('body#adminProductsEdit #editHeader')
const form = document.querySelector('body#adminProductsEdit #editForm')
const alert = document.querySelector('body#adminProductsEdit #alert')
const image = document.querySelector('body#adminProductsEdit input[type="file"]')
const fileName = document.querySelector('#fileName')

const setProductDetails = async () => {
	const product = await getProduct(`/products/${id}`)

	setDocumentTitle(`Edit ${product.title} / Admin`)

	Array.from(form.elements).forEach(el => {
		if (['text', 'number', 'textarea'].includes(el.type)) {
			el.value = product[el.name]
		}

		if (el.type === 'file') {
			fileName.textContent = product[el.name]?.name || 'No image chosen'
		}

		if (el.type === 'select-one') {
			el.value = product[el.name]?.id || null
		}

		if (el.type === 'checkbox') {
			el.checked = product[el.name]
		}
	})

	header.textContent += ` ${product.title}`
}

const setCategories = async () => {
	const container = document.querySelector('body#adminProductsEdit select[name="category"]')
	const categories = await getCategories()
	categories.forEach(({ name, id }) => {
		const html = parseHTML(`
			<option value="${id}">${name}</option>
		`)
		container.append(html)
	})
}

const setBrands = async () => {
	const container = document.querySelector('body#adminProductsEdit select[name="brand"]')
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

	Array.from(formElements).forEach(el => {
		if (!['submit', 'file'].includes(el.type)) {
			data[el.name] = el.value
		}

		if (el.type === 'file') {
			Array.from(el.files).forEach(file => {
				formData.append(`files.${el.name}`, file, file.name)
			})
		}
	})

	formData.append('data', JSON.stringify(data))

	const res = await editProduct(id, formData)

	setAlert(res)
}

const setAlert = ({ error, message, statusCode, title }) => {
	if (error) {
		alert.classList.remove('hidden')
		alert.classList.add('alert--error')
		alert.textContent = `ERROR: ${statusCode} (${error}) ${message}`
	} else {
		alert.classList.remove('hidden')
		alert.classList.add('alert--success')
		alert.textContent = `${title} successfully updated!`
	}
}

const setFileName = e => {
	fileName.textContent = Array.from(e.target.files)
		.map(el => el.name)
		.join(', ')
}

const setEvents = () => {
	form.addEventListener('submit', submitForm)
	image.addEventListener('change', setFileName)
}

loadPage(setBrands(), setCategories()).then(() => {
	setEvents()
	setProductDetails()
})
