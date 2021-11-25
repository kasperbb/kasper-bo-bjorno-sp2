import { getProduct } from '../../../services/products.js'
import { API_URL } from '../../../constants/index.js'
import { getJWT } from '../../../services/auth.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const header = document.querySelector('body#adminProductsEdit #editHeader')
const form = document.querySelector('body#adminProductsEdit #editForm')
const widget = document.querySelector('#upload_widget')

let imageUrl = ''

const uploadWidget = cloudinary.createUploadWidget(
	{
		cloudName: 'dbpqiu09c',
		uploadPreset: 'fgnxqjbc',
	},
	(error, result) => {
		if (!error && result && result.event === 'success') {
			imageUrl = result.info.secure_url
		}
	}
)

const setProductDetails = async () => {
	const product = await getProduct(`/products/${id}`)
	const [title, price, sale_price, stock, image_url, image, on_sale, featured] = form.elements
	title.value = product.title
	price.value = product.price
	sale_price.value = product.sale_price
	stock.value = product.stock
	image_url.value = product.image_url
	on_sale.checked = product.on_sale
	featured.checked = product.featured

	header.textContent += ` ${product.title}`
}

setProductDetails()

const submitForm = async e => {
	e.preventDefault()

	try {
		const [title, price, sale_price, stock, image_url, image, on_sale, featured] = e.target

		const body = {
			title: title.value,
			price: price.value,
			sale_price: sale_price.value,
			stock: stock.value,
			image_url: imageUrl || image_url.value,
			on_sale: on_sale.checked,
			featured: featured.checked,
		}

		const res = await fetch(`${API_URL}/products/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getJWT()}`,
			},
			body: JSON.stringify(body),
		})
		const json = await res.json()
		console.log(json)
	} catch (err) {
		console.log(err)
	} finally {
		window.location = '../../../../../admin/products/index.html'
	}
}

widget.addEventListener(
	'click',
	() => {
		uploadWidget.open()
	},
	false
)
form.addEventListener('submit', submitForm)
