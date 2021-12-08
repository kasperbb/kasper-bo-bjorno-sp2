import { alreadyInCart } from '../services/cart.js'
import { renderIcon } from './renderIcon.js'

export const productCard = ({
	id,
	image,
	image_url,
	price,
	sale_price,
	title,
	featured,
	on_sale,
	stock,
	brand,
}) => /*html*/ `
    <article class="product">
        ${renderCartButton(id)}
        <a href="product.html?id=${id}" class="z-20">
            <div class="product__image-container">
                ${renderImage(image_url, image)}
                <div class="product__pill-container">
                    ${featured ? '<span class="product__pill product__pill--featured">featured</span>' : ''}
                    ${on_sale ? '<span class="product__pill product__pill--onsale">on sale</span>' : ''}
                    ${stock <= 0 ? '<span class="product__pill product__pill--outofstock">out of stock</span>' : ''}
                </div>
            </div>
            <div class="product__content">
                <p class="product__brand">${brand?.name}</p>
                <h4 class="product__title">${title}</h4>
                <div class="flex items-center">
                    <p class="product__price">$${price}</p>
                    ${renderSalePrice(sale_price, on_sale)}
                </div>
            </div>
        </a>
    </article>
`

const renderCartButton = id => {
	if (alreadyInCart(id)) {
		return `
            <button class="product__button cart-button remove" data-id="${id}" aria-label="Add to Cart">
                ${renderIcon('shoppingBag')}
                ${renderIcon('minus', 'w-3 h-3')}
            </button>
        `
	}

	return `
        <button class="product__button cart-button" data-id="${id}" aria-label="Remove from Cart">
            ${renderIcon('shoppingBag')}
            ${renderIcon('plus', 'w-3 h-3')}
        </button>
    `
}

const renderImage = (image_url, image) => {
	if (image || image_url) {
		return /*html*/ `
            <img
                src="${image_url ? image_url : image.url}"
                alt=""
                class="product__image"
            />
        `
	}

	return /*html*/ `
        <img
            src="${'/assets/img/placeholder.png'}"
            alt=""
            class="product__image"
        />
    `
}

const renderSalePrice = (sale_price, on_sale) => {
	if (sale_price && on_sale) {
		return `
            <del class="product__sale">$${sale_price}</del>
        `
	}

	return ''
}
