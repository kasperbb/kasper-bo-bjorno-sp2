import { EMAIL_REGEX } from '../constants/index.js'

export const validateForm = (form, obj) => {
	const validFields = []

	Object.entries(obj).forEach(([name, val]) => {
		const field = form.elements[name]
		const error = field.nextElementSibling

		error.textContent = ''
		field.classList.remove('error')

		if (error.tagName !== 'LABEL') {
			console.log(error.tagName)
			throw new Error(`The ${field.name} field is missing a <label> error element.`)
		}

		Object.keys(val).forEach(property => {
			if (!validProperties.includes(property)) {
				throw new Error(`${property} is not a valid property.`)
			}
		})

		Object.entries(val).forEach(([key, val]) => {
			if (validate[key]) {
				const { value, message } = validate[key](field, val)
				validFields.push(value)
				if (!value) {
					error.textContent = `${field.name.replace(/_/g, ' ')} ${message}`
					field.classList.add('error')
				}
			}
		})
	})

	return validFields.every(Boolean)
}

const validate = {
	required: (field, val) => ({
		value: val ? field?.value.length : true,
		message: 'is required',
	}),
	numeric: (field, val) => ({
		value: val ? isNumeric(field.value) : true,
		message: 'must be a numeric value',
	}),
	maxLength: (field, length) => ({
		value: field.value.length < length,
		message: `must be less than ${length} characters`,
	}),
	minLength: (field, length) => ({
		value: field.value.length > length,
		message: `must be more than ${length} characters`,
	}),
	validEmail: (field, val) => ({
		value: val ? EMAIL_REGEX.test(field.value) : false,
		message: 'must be a valid email address',
	}),
}

const validProperties = Object.keys(validate).map(property => property)

const isNumeric = str => {
	if (typeof str != 'string') return false // we only process strings!
	return (
		!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	) // ...and ensure strings of whitespace fail
}
