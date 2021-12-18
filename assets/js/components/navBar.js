import { renderIcon } from '../utils/renderIcon.js'
import { isAuthenticated } from '../services/auth.js'

export const navBar = () => /*html*/ `
    <div class="relative bg-white shadow">
        <div class="px-5 mx-auto max-w-6xl">
            <div class="flex items-center justify-between py-3 md:justify-start">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                    <a href="index.html" aria-label="Go to homepage">
                        <img src="/assets/img/logo.png" alt="Logo" class="w-10 h-10" />
                    </a>
                </div>

                <div class="-my-2 -mr-2 md:hidden">
                    <button 
                        class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        id="navMenuButton"
                    >
                        <span class="sr-only">Open menu</span>
                        ${renderIcon('menu')}
                    </button>
                </div>

                <nav class="hidden md:flex w-1/3">
                    ${renderSearchBar()}
                </nav>

                <div class="items-center justify-end hidden gap-4 md:flex md:flex-1 lg:w-0">
                    ${renderAuthButton()}
                    <a href="cart.html" class="btn btn--rounded btn--hover ml-8 relative">
                        <span class="absolute bg-secondary rounded-full w-5 h-5 text-white grid place-content-center text-xs -top-1 -left-2 cart-count">0</span>
                        ${renderIcon('shoppingBag')}
                    </a>
                    ${renderAdminButton()}
                </div>
            </div>
        </div>


        <div class="absolute inset-x-0 top-0 z-30 transition origin-top-right transform hidden md:hidden" id="navMenu">
            <div class="bg-white divide-y-2 shadow-xl ring-1 ring-black ring-opacity-5 divide-gray-50">
                <div class="px-5 py-3">
                    <div class="flex items-center justify-between">
                        <div>
                            <a href="index.html" aria-label="Go to homepage">
                                <img src="/assets/img/logo.png" alt="Logo" class="w-10 h-10" />
                            </a>
                        </div>
                        <div class="-mr-2">
                            <button 
                                class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                                id="navMenuCloseButton"
                            >
                                <span class="sr-only">Close menu</span>
                                ${renderIcon('x', 'w-6 h-6')}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="px-5 py-6">
                    ${renderSearchBar()}
                    <div class="flex gap-3 pt-3">
                        ${renderMobileAuthButton()}

                        <a
                            href="cart.html"
                            class="btn w-full"
                        >
                            ${renderIcon('shoppingBag')} <span class="cart-count">(3)</span>
                        </a>

                        ${renderMobileAdminButton()}
                    </div>
                </div>
            </div>
        </div>
    </div>
`

const renderSearchBar = () => /*html*/ `
    <form
        action="results.html"
        class="
            bg-white
            border border-gray-200
            text-sm
            rounded
            flex
            w-full
            items-center
            md:ml-4 lg:ml-0
        "
    >
        <input
            type="search"
            name="search"
            placeholder="Search"
            class="flex-grow pl-4 rounded-l text-sm focus:outline-none"
        />
        <button type="submit" aria-label="Search">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="m-3 text-lg text-gray-500 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </button>
    </form>
`

const renderAdminButton = () => {
	if (isAuthenticated) {
		return /*html*/ `
            <a href="admin/products/index.html" class="btn btn--rounded btn--hover" aria-label="Go to admin">
                ${renderIcon('cog')}
            </a>
        `
	}

	return ''
}

const renderAuthButton = () => {
	if (isAuthenticated) {
		return /*html*/ `
            <button class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900 logout-button">Sign out</button>
        `
	}

	return /*html*/ `<a href="login.html" class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">Sign in</a>`
}

const renderMobileAdminButton = () => {
	if (isAuthenticated) {
		return /*html*/ `
            <a href="admin/products/index.html" class="btn w-full" aria-label="Go to admin">
                ${renderIcon('cog')}
            </a>
        `
	}

	return ''
}

const renderMobileAuthButton = () => {
	if (isAuthenticated) {
		return /*html*/ `
            <button
                href="login.html"
                class="btn w-full logout-button"
            >
                Sign out
            </button>
        `
	}

	return /*html*/ `
        <a
            href="login.html"
            class="btn w-full"
        >
            Sign in
        </a>
    `
}
