import { alreadyInCart } from '../services/cart.js'

export const productDetails = ({
	id,
	image,
	image_url,
	title,
	description,
	price,
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
                <p class="product-details__category">Category: ${category.name}</p>
            </div>
            <div class="product-details__buttons">
                <button class="product-details__pay">Pay $${price}</button>
                <button class="product-details__cart cart-button" data-id="${id}" data-type="nonIcon">
                    ${alreadyInCart(id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    </div>
`

export const productDetailstest = ({
	id,
	image,
	image_url,
	title,
	description,
	price,
	category,
	brand,
	stock,
}) => /*html*/ `
    <div class="h-calc flex flex-wrap">
        <img
            alt="ecommerce"
            class="lg:w-1/2 w-full lg:h-full h-80 object-cover object-center"
            src="${image_url || image?.url || '/assets/img/placeholder.png'}"
        />
        <div class="lg:w-1/2 w-full flex flex-col">
            <nav class="text-gray-500 bg-gray-100 font-medium text-xs px-5 py-3" aria-label="Breadcrumb">
                <ol class="list-none p-0 inline-flex">
                    <li class="flex items-center">
                        <a href="/">Home</a>
                        <svg class="fill-current w-2 h-2 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                    </li>
                    <li>
                        <span class="text-gray-400 pointer-events-none" aria-current="page">${title}</span>
                    </li>
                </ol>
            </nav>
            <div class="px-5 py-10 flex-1 mb-16">
                <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">${brand?.name || ''}</h2>
                <h1 class="text-gray-900 text-3xl title-font font-bold mb-1">${title}</h1>
                <div class="flex gap-2 mb-4 py-2">
                    <a class="text-gray-500">
                        <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a class="text-gray-500">
                        <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                            ></path>
                        </svg>
                    </a>
                    <a class="text-gray-500">
                        <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                            ></path>
                        </svg>
                    </a>
                </div>
                <div class="flex gap-2">
                    <p class="font-primary">Category: ${category?.name}</p>
                </div>
                ${renderStock(stock)}
                <p class="leading-relaxed text-sm mt-10">${description || ''}</p>
            </div>
            <div class="fixed bottom-0 right-0 w-full lg:w-1/2 bg-white flex items-center border-t border-gray-200 px-5 py-3">
                <span class="title-font font-medium text-xl text-gray-900">$${price}</span>

                <button class="btn ml-auto cart-button" data-id="${id}" data-type="nonIcon">
                    ${alreadyInCart(id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                
                <button
                    class="
                        rounded-full
                        w-10
                        h-10
                        bg-gray-200
                        p-0
                        border-0
                        inline-flex
                        items-center
                        justify-center
                        text-gray-500
                        hover:bg-gray-300
                        ml-4
                    "
                >
                    <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
	</div>
`

const renderStock = stock => {
	if (stock >= 20) {
		return `
            <p class="font-primary text-green-500 text-sm my-3">${stock} in stock</p>
        `
	}

	if (stock >= 10) {
		return `
            <p class="font-primary text-yellow-500 text-sm my-3">${stock} in stock</p>
        `
	}

	if (stock >= 3) {
		return `
            <p class="font-primary text-red-500 text-sm my-3">${stock} in stock</p>
        `
	}

	if (stock <= 0) {
		return `
            <p class="font-primary text-red-500 text-sm my-3">Out of stock</p>
        `
	}
}
