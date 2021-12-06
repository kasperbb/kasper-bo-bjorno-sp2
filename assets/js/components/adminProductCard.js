import { API_URL } from '../constants/index.js'

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
                    <a href="#" class="font-semibold text-lg">${title}</a>
                    <span class="text-gray-400 text-md">$${price}</span>
                </div>
            </div>
            <div class="flex gap-2 p-4">
                <a href="./edit.html?id=${id}" class="flex justify-center items-center bg-blue-500 rounded-full w-8 h-8 transition-transform transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </a>
                <button class="flex justify-center items-center bg-red-500 rounded-full w-8 h-8 transition-transform transform hover:scale-110 delete-product-button" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
`
const renderImage = (image_url, image) => {
	if (image || image_url) {
		return /*html*/ `
            <img
                class="h-28 w-28 object-cover"
                src="${image_url ? image_url : image.url}"
                alt=""
            />
        `
	}

	return /*html*/ `
        <img
            class="h-28 w-28 object-cover"
            src="/assets/img/placeholder.png"
            alt=""
        />
    `
}
