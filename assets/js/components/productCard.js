import { alreadyInCart } from '../services/cart.js'

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
        <button class="product__button cart-button" data-id="${id}">
            ${renderCartIcon(id)}
        </button>
        <a href="product.html?id=${id}" class="z-20">
            <div class="w-full overflow-hidden h-36">
                ${renderImage(image_url, image)}
                <div class="flex gap-2 top-2 left-2 absolute">
                    ${featured ? '<span class="product__pill product__pill--featured">featured</span>' : ''}
                    ${on_sale ? '<span class="product__pill product__pill--onsale">on sale</span>' : ''}
                    ${stock <= 0 ? '<span class="product__pill product__pill--outofstock">out of stock</span>' : ''}
                </div>
            </div>
            <div class="p-6">
                ${renderBrand(brand)}
                <div class="flex justify-between items-end">
                    <h4 class="product__title">${title}</h4>
                    <div class="flex items-center">
                        <p class="product__price">$${price}</p>
                        ${renderSalePrice(sale_price, on_sale)}
                    </div>
                </div>
            </div>
        </a>
    </article>
`

const renderCartIcon = id => {
	if (alreadyInCart(id)) {
		return /*html*/ `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
			</svg>
        `
	}

	return /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
		</svg>
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

const renderBrand = brand => {
	if (brand) {
		return /*html*/ `
            <p class="product__brand">${brand.name}</p>
        `
	}

	return ''
}

const renderSalePrice = (sale_price, on_sale) => {
	if (sale_price && on_sale) {
		return `
            <del class="text-xs font-primary text-opacity-70 text-red-500">$${sale_price}</del>
        `
	}

	return ''
}
