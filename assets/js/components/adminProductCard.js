import { renderIcon } from '../utils/renderIcon.js'

export const adminProductCard = ({ id, image, image_url, title, price }) => /*html*/ `
    <div
        class="
            flex
            justify-between
            bg-white
            dark:bg-gray-600
            shadow-sm
            rounded
            overflow-hidden
        "
    >
        <div class="flex justify-between items-center w-full">
            <div class="flex">
                ${renderImage(image_url, image)}
    
                <div class="p-4 flex flex-col capitalize">
                    <a href="./edit.html?id=${id}" class="font-semibold text-lg">${title}</a>
                    <span class="text-gray-400 text-md">$${price}</span>
                </div>
            </div>
            <div class="flex gap-2 p-4">
                <a href="./edit.html?id=${id}" class="flex justify-center items-center bg-blue-500 rounded-full w-8 h-8 transition-transform transform hover:scale-110">
                    ${renderIcon('pencil', 'h-4 w-4 text-white')}
                </a>
                <button class="flex justify-center items-center bg-red-500 rounded-full w-8 h-8 transition-transform transform hover:scale-110 delete-product-button" data-id="${id}">
                    ${renderIcon('trash', 'h-4 w-4 text-white')}
                </button>
            </div>
        </div>
    </div>
`
const renderImage = (image_url, image) => {
	if (image || image_url) {
		return /*html*/ `
            <img
                loading="lazy"
                class="h-28 w-28 object-cover"
                src="${image_url ? image_url : image.url}"
                alt=""
            />
        `
	}

	return /*html*/ `
        <img
            loading="lazy"
            class="h-28 w-28 object-cover"
            src="/assets/img/placeholder.png"
            alt=""
        />
    `
}
