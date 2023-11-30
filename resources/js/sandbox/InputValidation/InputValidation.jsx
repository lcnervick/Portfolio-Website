import './InputValidation.css';

/**
 * Validates an input value against a regular expression, colors the input based on validation status
 *  and puts focus on the next element if provided.
 * While typing or if the input is empty, the default border color will be used.
 * While typing or on foucus-out, input will turn green if validated or red if not.
 * Returns a clean-up function that can provide useEffect the ability to run this hook and clean up after it.
 * 
 * Usage: useEffect(() => useInputValidation(inputRef, /^(0[1-9]|1[0-2])\/([0-9]{2})$/, nextInputRef), [inputState]);
 * 
 * @param {React.MutableRefObject} inputRef A React Reference to an Input Element.
 * @param {RegExp} pattern The RegExp pattern to match the inputRef's value to in order to validate.
 * @param {React.MutableRefObject?} focusRef A React Reference to the form element to add focus to on validation.
 * @returns function
 */
export default function useInputValidation(inputRef, pattern, focusRef) {
	const element = inputRef.current;
	// this will be called on each re-render of the element
	const handleFocus = (e) => {
		element.validated = !!e.target.value.match(pattern);
		element.classList.remove('input-unvalidated');
		element.classList.remove('input-validated');
		if (element.validated) {
			element.classList.add('input-validated');
		}
	};

	const handleInput = (e) => {
		element.validated = !!e.target.value.match(pattern);
		if (element.validated) {
			element.classList.add('input-validated');
			if (typeof focusRef !== 'undefined' && focusRef.current) focusRef.current.focus();
		}
	};

	const handleBlur = (e) => {
		element.validated = !!e.target.value.match(pattern);
		if (e.target.value === "") {
			element.classList.remove('input-unvalidated');
			element.classList.remove('input-validated');
		}
		else if (element.validated) {
			element.classList.add('input-validated');
		} else {
			element.classList.add('input-unvalidated');
		}
	};

	element.addEventListener('focus', handleFocus);
	element.addEventListener('input', handleInput);
	element.addEventListener('blur', handleBlur);

	return () => {
		element.removeEventListener('focus', handleFocus);
		element.removeEventListener('input', handleInput);
		element.removeEventListener('blur', handleBlur);
	};
}
