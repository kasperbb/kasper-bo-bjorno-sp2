import { API_URL } from '../../../constants/index.js'
import { getJWT } from '../../../services/auth.js'

const form = document.querySelector('body#adminProductsAdd #addForm')
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

const submitForm = async e => {
	e.preventDefault()

	const [title, price, sale_price, stock, image_url, image, on_sale, featured] = e.target

	const body = {
		title: title.value,
		price: price.value,
		sale_price: sale_price.value,
		stock: stock.value,
		image_url: imageUrl,
		on_sale: on_sale.checked,
		featured: featured.checked,
	}

	try {
		const res = await fetch(`${API_URL}/products`, {
			method: 'POST',
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
