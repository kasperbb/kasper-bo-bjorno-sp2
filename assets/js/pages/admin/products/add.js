import { parseHTML } from '../../../utils/parseHTML.js'
import { validateForm } from '../../../utils/validateForm.js'
import { loadPage } from '../../../utils/loadPage.js'
import { addProduct } from '../../../services/products.js'
import { getCategories } from '../../../services/categories.js'
import { getBrands } from '../../../services/brands.js'

const form = document.querySelector('body#adminProductsAdd #addForm')
const alert = document.querySelector('body#adminProductsAdd #alert')
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

	const res = await addProduct(body)
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
		alert.textContent = `${title} successfully created!`
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
})
