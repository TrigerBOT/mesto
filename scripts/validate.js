
const formArray = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
};

function setEventListeners(formElement, elementList) {
    const inputList = Array.from(formElement.querySelectorAll(elementList.inputElement));
    const submitButton = formElement.querySelector(elementList.submitButtonSelector);
    toggleButtonState(inputList, submitButton, elementList);
    inputList.forEach((inputElement) => {

        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, elementList);
            toggleButtonState(inputList, submitButton, elementList);
        })
    })
}
// проверяем на валидность
function checkValidity(formElement, inputElement, elementList) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, elementList);
    } else {
        hideInputError(formElement, inputElement, elementList);
    }
}
//переключаем состояние кнопки
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}
function toggleButtonState(inputList, buttonElement, elementList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(elementList.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(elementList.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled')
    }
}

function showInputError(formElement, inputElement, elementList) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.add(elementList.errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

function hideInputError(formElement, inputElement, elementList) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(elementList.errorClass);
    errorElement.textContent = '';
};


//включаем валидацию для всех форм
function enableValidation(elementList) {
    const formList = Array.from(document.querySelectorAll(elementList.formElement));
    formList.forEach((formElement) => {
        setEventListeners(formElement, elementList);
    })
}
enableValidation(formArray);


