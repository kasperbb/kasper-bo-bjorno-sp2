import { CURRENCY_SYMBOL } from '../constants/index.js'
import { alreadyInCart } from '../services/cart.js'
import { renderIcon } from '../utils/renderIcon.js'

export const productCard = ({ id, image, price, sale_price, title, featured, on_sale, stock, brand }) => /*html*/ `
    <article class="relative overflow-hidden transition bg-white rounded shadow-lg hover:shadow-xl focus:shadow-xl group">
        ${renderCartButton(id, price, sale_price, on_sale)}
        <a href="product.html?id=${id}" class="z-20">
            <div class="w-full overflow-hidden h-36">
                ${renderImage(image)}
                <div class="absolute flex gap-2 transition-opacity duration-300 top-2 left-2 group-hover:opacity-0">
                    ${featured ? '<span class="px-2 py-1 text-xs font-semibold text-white uppercase rounded-full font-cta bg-secondary">featured</span>' : ''}
                    ${on_sale ? '<span class="px-2 py-1 text-xs font-semibold text-white uppercase rounded-full font-cta bg-primary-dark">on sale</span>' : ''}
                    ${
						stock <= 0
							? '<span class="px-2 py-1 text-xs font-semibold text-white uppercase rounded-full font-cta bg-red-700">out of stock</span>'
							: ''
					}
                </div>
            </div>
            <div class="p-6">
                <p class="flex-1 text-xs uppercase font-primary">${brand?.name}</p>
                <p class="mt-1 text-base font-semibold text-secondary">${title}</p>
                <div class="flex items-center">
                    ${renderPrice(price, sale_price, on_sale)}
                </div>
            </div>
        </a>
    </article>
`

export const productCardSkeleton = `
    <article class="overflow-hidden transition bg-white rounded shadow-lg hover:shadow-xl focus:shadow-xl">
        <div class="z-20">
            <div class="w-full overflow-hidden bg-gray-300 animate-pulse h-36"></div>
            <div class="p-6">
                <div class="flex-1 w-8 h-4 bg-gray-300 animate-pulse"></div>
                <div class="w-24 h-4 mt-1 bg-gray-300 animate-pulse"></div>
                <div class="h-4 mt-1 bg-gray-300 w-14 animate-pulse"></div>
            </div>
        </div>
    </article>
`

const renderCartButton = (id, price, sale_price, on_sale) => {
	if (alreadyInCart(id)) {
		return `
            <button class="absolute z-30 flex items-center justify-center p-2 text-white transition-transform transform rounded-full bg-red-400 top-24 right-3 hover:scale-105 focus:scale-105 hover:bg-red-400 focus:bg-red-400 cart-button" data-id="${id}" data-price="${
			on_sale ? sale_price : price
		}" aria-label="Add to Cart">
                ${renderIcon('shoppingBag')}
                ${renderIcon('minus', 'w-3 h-3')}
            </button>
        `
	}

	return `
        <button class="absolute z-30 flex items-center justify-center p-2 text-white transition-transform transform rounded-full bg-primary top-24 right-3 hover:scale-105 focus:scale-105 hover:bg-primary-light focus:bg-primary-light cart-button" data-id="${id}" data-price="${
		on_sale ? sale_price : price
	}" aria-label="Remove from Cart">
            ${renderIcon('shoppingBag')}
            ${renderIcon('plus', 'w-3 h-3')}
        </button>
    `
}

const renderImage = image => {
	if (image) {
		return /*html*/ `
            <img
                src="${image.url}"
                alt="${image.alternativeText}"
                class="object-cover w-full h-full"
            />
        `
	}

	return /*html*/ `
        <img
            src="/assets/img/placeholder.png"
            alt="No image available"
            class="object-cover w-full h-full"
        />
    `
}

const renderPrice = (price, sale_price, on_sale) => {
	if (sale_price && on_sale) {
		return `
            <p class="inline-block mr-1 text-sm font-medium font-primary">${CURRENCY_SYMBOL}${sale_price}</p>
            <del class="text-xs text-red-700 font-primary">${CURRENCY_SYMBOL}${price}</del>
        `
	}

	return `<p class="inline-block mr-1 text-sm font-medium font-primary">${CURRENCY_SYMBOL}${price}</p>`
}
