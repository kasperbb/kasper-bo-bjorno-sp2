export const category = ({ id, name, image }) => /*html*/ `
    <a
        href="/products.html?category=${id}"
        class="relative flex items-center justify-center overflow-hidden text-center bg-gray-300 rounded-md  group"
    >
        <img
            loading="lazy"
            alt="${name} category"
            src="${image?.url || '/assets/img/placeholder.png'}"
            class="object-cover w-full h-80 transition duration-500 ease-in-out transform rounded-md  group-hover:rotate-6 group-hover:scale-125"
        />
        <div
            class="absolute w-full h-full transition-opacity duration-500 bg-black opacity-50  brand_overlay top left group-hover:opacity-80"
        ></div>
        <div class="absolute flex items-center justify-center w-full h-full p-2 top left">
            <h2 class="flex-shrink-0 text-5xl font-semibold text-white uppercase">${name}</h2>
        </div>
    </a>
`
