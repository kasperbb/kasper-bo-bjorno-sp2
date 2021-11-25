import { isAuthenticated } from '../services/auth.js'
import { renderIcon } from './renderIcon.js'

const navItems = [{ title: 'Products', href: 'products.html' }]

export const navBar = () => /*html*/ `
    <div class="relative bg-white rounded-b shadow">
        <div class="px-4 mx-auto max-w-7xl sm:px-6">
            <div class="flex items-center justify-between py-3 md:justify-start md:space-x-10">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                    <a href="index.html" class="font-semibold">
                        Athes
                    </a>
                </div>

                <div class="-my-2 -mr-2 md:hidden">
                    <button 
                        class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        id="navMenuButton"
                    >
                        <span class="sr-only">Open menu</span>
                        ${renderIcon('menu')}
                    </button>
                </div>
                <nav class="hidden space-x-10 md:flex">
                    ${renderNavItems()}
                </nav>

                <div class="items-center justify-end hidden gap-4 md:flex md:flex-1 lg:w-0">
                    ${renderAuthButton()}
                    <a href="cart.html" class="btn btn--rounded ml-8">
                        ${renderIcon('shoppingBag')}
                    </a>
                    ${renderAdminButton()}
                </div>
            </div>
        </div>


        <div class="absolute inset-x-0 top-0 p-2 transition origin-top-right transform hidden md:hidden" id="navMenu">
            <div class="bg-white divide-y-2 rounded shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
                <div class="px-5 pt-5 pb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <a href="index.html" class="font-semibold">
                                Athes
                            </a>
                        </div>
                        <div class="-mr-2">
                            <button 
                                class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                id="navMenuCloseButton"
                            >
                                <span class="sr-only">Close menu</span>
                                ${renderIcon('x', 'w-6 h-6')}
                            </button>
                        </div>
                    </div>
                    <div class="mt-6">
                        <nav class="grid gap-y-8">
                            <a
                                href="#"
                                class="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50"
                            >
                                <item.icon class="flex-shrink-0 w-6 h-6 text-indigo-600" aria-hidden="true" />
                                <span class="ml-3 text-base font-medium text-gray-900">Products</span>
                            </a>
                        </nav>
                    </div>
                </div>
                <div class="px-5 py-6 space-y-6">
                    <div>
                        <a
                            href="login.html"
                            class="btn"
                        >
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

export const navBarTest = () => /*html*/ `
    <nav class="fixed w-full z-30 flex flex-col lg:flex-row items-center px-8 justify-between bg-white shadow h-16">
        <div class="flex justify-between items-center w-full h-full lg:w-1/2">
            <a href="/" class="text-lg font-medium text-gray-700">Athes</a>

            <button class="flex flex-row-reverse mr-4 ml-4 md:hidden" id="toggleNavButton">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
            </button>
        </div>

        <div class="flex items-center px-4 lg:px-0">
            <form
                action="results.html"
                class="
                    bg-gray-200
                    cursor-pointer
                    border border-gray-300
                    text-sm
                    rounded
                    flex
                "
            >
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    class="flex-grow px-4 rounded-l text-sm focus:outline-none"
                />
                <button type="submit">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="m-3 text-lg text-gray-700 w-4 h-4"
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
        </div>

        ${renderAuthButton()}
        <a href="cart.html" class="flex justify-center items-center text-white text-center bg-primary rounded-full w-10 h-10 m-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
            </svg>
        </a>
        ${renderAdminButton()}
	</nav>
`

const renderNavItems = () => {
	return navItems.map(
		({ title, href }) => `
        <a href="${href}" class="text-base font-medium text-gray-500 hover:text-gray-900">
            ${title}
        </a>
    `
	)
}

const renderAdminButton = () => {
	if (isAuthenticated) {
		return /*html*/ `
            <a href="admin/products/index.html" class="btn btn--rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
            </a>
        `
	}

	return ''
}

const renderAuthButton = () => {
	if (isAuthenticated) {
		return /*html*/ `
            <button class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900" id="logoutButton">Log Out</button>
        `
	}

	return /*html*/ `<a href="login.html" class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">Sign in</a>`
}
