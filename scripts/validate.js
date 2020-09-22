export default class Validation{

    constructor(object , element){
        this._formElement = element;
        this._inputElement = object.inputElement;
        this._errorClass = object.errorClass;
        this._submitButtonSelector = object.submitButtonSelector;
        this._inactiveButtonClass = object.inactiveButtonClass; 
    }
    
    _showInputError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = input.validationMessage;
    };
    
    _hideInputError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    _checkValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    _toggleButtonState(inputList,submitButton) {
        if ( this._hasInvalidInput(inputList)) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.setAttribute('disabled', 'disabled');
        } else {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.removeAttribute('disabled', 'disabled')
        }
    }
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList,submitButton);
        inputList.forEach((input) => {
    
            input.addEventListener('input', () => {
                this._checkValidity(input);
               this._toggleButtonState(inputList, submitButton);
            })
        })
    }
    
    enableValidation() {
       this._setEventListeners();
    }
    
}


