import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._modalWindow.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._modalWindow.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return [this._formValues];
    }

    _setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {evt.preventDefault();
             this._handleFormSubmit()
            }) 
    }
    _handleFormSubmit() {
       
        this._submitForm(this._getInputValues());
        }
    closePopup() {
        super.closePopup();
        this._formElement.removeEventListener('submit', (evt) => {evt.preventDefault(); this._handleFormSubmit()})
        this._formElement.reset();
    }

    openPopup() {
        this._setEventListeners();
        super.openPopup();
    }
}