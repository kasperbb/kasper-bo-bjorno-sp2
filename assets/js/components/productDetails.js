import { CURRENCY_SYMBOL } from '../constants/index.js'
import { alreadyInCart } from '../services/cart.js'

export const productDetails = ({
	id,
	image,
	image_url,
	title,
	description,
	price,
	sale_price,
	on_sale,
	category,
	brand,
	stock,
}) => /*html*/ `
    <div class="product-details">
        <nav aria-label="Breadcrumb" class="md:col-span-2">
            <ol role="list" class="flex items-center text-sm">
                <li class="flex items-center">
                    <a href="/products.html" class="text-sm font-medium text-gray-900">
                        Products
                    </a>
                    <svg
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        class="w-4 h-5 text-gray-300"
                    >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                </li>
                <li class="flex items-center">
                    <a href="/products.html?category=${category.id}" class="text-sm font-medium text-gray-900">
                        ${category.name}
                    </a>
                    <svg
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        class="w-4 h-5 text-gray-300"
                    >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                </li>
                <li class="font-medium text-gray-500 hover:text-gray-600">
                    ${title}
                </li>
            </ol>
        </nav>

        <img
            loading="lazy"
            alt="${title}"
            class="product-details__image"
            src="${image_url || image?.url || '/assets/img/placeholder.png'}"
        />

        <div class="product-details__container">
            <div>
                <h2 class="product-details__brand">${brand?.name || ''}</h2>
                <h1 class="product-details__title">${title}</h1>
                ${renderStock(stock)}
                <p class="product-details__description">${description || ''}</p>
                <p class="product-details__category">
                    Category:
                    <a 
                        href="/products.html?category=${category.id}"
                        class="product-details__category-link"
                    >
                        ${category.name}
                    </a>
                </p>
            </div>
            <div class="product-details__buttons">
                <button class="product-details__pay">${renderPrice(price, sale_price, on_sale)}</button>
                <button class="product-details__cart cart-button" data-id="${id}" data-type="nonIcon">
                    ${alreadyInCart(id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    </div>
`

const renderStock = stock => {
	if (stock >= 50) {
		return `
            <p class="font-primary text-green-500 text-sm my-3">50+ in stock</p>
        `
	}

	if (stock >= 20) {
		return `
        <p class="font-primary text-yellow-500 text-sm my-3">${stock} in stock</p>
    `
	}

	if (stock >= 1) {
		return `
            <p class="font-primary text-red-500 text-sm my-3">${stock} in stock</p>
        `
	}

	return `
        <p class="font-primary text-red-500 text-sm my-3">Out of stock</p>
    `
}

const renderPrice = (price, sale_price, on_sale) => {
	if (sale_price && on_sale) {
		return `
            Pay ${CURRENCY_SYMBOL}${sale_price}
        `
	}

	return `Pay ${CURRENCY_SYMBOL}${price}`
}
