import { CURRENCY_SYMBOL } from '../constants/index.js'
import { parseHTML } from '../utils/parseHTML.js'
import { loadPage } from '../utils/loadPage.js'
import { productCard } from '../components/productCard.js'
import { getCartItems, getCart } from '../services/cart.js'
import { renderIcon } from '../utils/renderIcon.js'

const container = document.querySelector('body#cart #cartContainer')
const stockWarning = document.querySelector('#stockWarning')
const totalContainer = document.querySelector('#total')
let total = 0

const noItems = parseHTML(`
<p>No items in your cart.</p>
`)

const setCartItems = async () => {
	const cart = await getCartItems()

	if (!cart) {
		container.append(noItems)
		return loadPage()
	}

	checkOutOfStock(cart)
	calculateTotal(cart)

	cart.forEach(product => {
		const html = parseHTML(productCard(product))
		container.append(html)
	})

	const buttons = document.querySelectorAll('.cart-button')
	buttons.forEach(button => {
		button.addEventListener('click', setEvents)
	})
}

const calculateTotal = cart => {
	total = cart.reduce((acc, cur) => {
		if (cur.on_sale) {
			return acc + +cur.sale_price
		}

		return acc + +cur.price
	}, 0)

	setTotal(total)
}

const setTotal = num => {
	totalContainer.textContent = `${CURRENCY_SYMBOL}${num}`
}

const checkOutOfStock = cart => {
	const outOfStockArr = cart.reduce((acc, cur) => {
		if (cur.stock <= 0) acc.push(cur.title)
		return acc
	}, [])

	console.log(outOfStockArr)

	let html = ''

	if (outOfStockArr.length) {
		const titles = outOfStockArr.join(', ')
		html = parseHTML(`
			<p class="flex items-center gap-2 col-span-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded">
				${renderIcon('exclamation')}
				${titles} are out of stock.
			</p>
		`)
		stockWarning.replaceChildren(html)
	}
}

function setEvents() {
	const cart = getCart()
	this.parentElement.remove()

	total -= +this.dataset.price
	setTotal(total)

	// Cart length will be equal to 1 (not 0) at the point of clicking the last item
	if (cart.length === 1) {
		container.append(noItems)
	}
}

loadPage(setCartItems())
