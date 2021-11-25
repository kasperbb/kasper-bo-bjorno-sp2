import { EMAIL_REGEX } from '../constants/index.js'

export const validateForm = (form, obj) => {
	const validFields = []

	Object.entries(obj).forEach(([name, val]) => {
		const { required, minLength, maxLength, validEmail } = val
		const field = form.elements[name]
		const error = field.nextElementSibling

		error.textContent = ''
		if (error.tagName !== 'LABEL') {
			console.log(error.tagName)
			throw new Error('Field is missing an error element.')
		}

		if (required) {
			const valid = validateRequired(field)
			if (!valid) {
				validFields.push(valid)
				error.textContent = `${field.name} is required`
			}
		}

		if (minLength) {
			const valid = validateMinLength(field, minLength)
			if (!valid) {
				validFields.push(valid)
				error.textContent = `${field.name} must be at least ${minLength} characters`
			}
		}

		if (maxLength) {
			const valid = validateMaxLength(field, maxLength)
			if (!valid) {
				validFields.push(valid)
				error.textContent = `${field.name} must be less than ${maxLength} characters`
			}
		}

		if (minLength && maxLength) {
			const valid = validateMinLength(field, minLength) && validateMaxLength(field, maxLength)
			if (!valid) {
				validFields.push(valid)
				error.textContent = `${field.name} must be at least ${minLength} characters and less than ${maxLength} characters`
			}
		}

		if (validEmail) {
			const valid = validateEmail(field)
			if (!valid) {
				validFields.push(valid)
				error.textContent = `${field.name} must be a valid email address`
			}
		}
	})

	return validFields.every(Boolean)
}

const validateRequired = field => field?.value.length
const validateMinLength = (field, length) => field.value.length > length
const validateMaxLength = (field, length) => field.value.length < length
const validateEmail = field => EMAIL_REGEX.test(field.value)
