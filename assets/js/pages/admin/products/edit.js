import { getProduct } from '../../../services/products.js'
import { API_URL } from '../../../constants/index.js'
import { getJWT } from '../../../services/auth.js'

import { validateForm } from '../../../components/validateForm.js'
import { loadPage } from '../../../components/loadPage.js'
import { editProduct } from '../../../services/products.js'
import { getCategories } from '../../../services/categories.js'
import { getBrands } from '../../../services/brands.js'
import { parseHTML } from '../../../utils/parseHTML.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const header = document.querySelector('body#adminProductsEdit #editHeader')
const form = document.querySelector('body#adminProductsEdit #editForm')
const alert = document.querySelector('body#adminProductsEdit #alert')
const widget = document.querySelector('#upload_widget')

let imageUrl = null

const uploadWidget = cloudinary.createUploadWidget(
	{
		cloudName: 'dbpqiu09c',
		uploadPreset: 'fgnxqjbc',
	},
	(error, result) => {
		if (!error && result && result.event === 'success') {
			imageUrl = result.info.secure_url
			widget.textContent += `: ${result.info.original_filename}.${result.info.format}`
		}
	}
)

const setProductDetails = async () => {
	const product = await getProduct(`/products/${id}`)

	imageUrl = product.image_url

	Array.from(form.elements).forEach(el => {
		if (el.type === 'text' || el.type === 'number' || el.type === 'textarea') {
			el.value = product[el.name]
		}

		if (el.type === 'select-one') {
			el.value = product[el.name]?.id || null
		}

		if (el.type === 'button') {
			el.textContent = `Image uploaded: ${product['image_url'] || product['image'].name}`
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

	const [title, price, sale_price, stock, brand, category, image, description, on_sale, featured] = e.target

	const body = {
		title: title.value,
		price: price.value,
		sale_price: sale_price.value,
		stock: stock.value,
		brand: +brand.value,
		category: +category.value,
		image_url: imageUrl,
		description: description.value,
		on_sale: on_sale.checked,
		featured: featured.checked,
	}

	const res = await editProduct(id, body)
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

const setEvents = () => {
	widget.addEventListener(
		'click',
		() => {
			uploadWidget.open()
		},
		false
	)
	form.addEventListener('submit', submitForm)
}

loadPage(setBrands(), setCategories()).then(() => {
	setEvents()
	setProductDetails()
})
