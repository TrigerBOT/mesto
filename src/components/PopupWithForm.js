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
        return this._formValues;
    }

    _setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit()
        } ,{once: true})

    }
    fillInputs(data){
     
        this._inputList = this._modalWindow.querySelectorAll('.popup__input');
        this._inputList.forEach(input =>input.value=data[input.name] );
    }
    _clearInputs(){
        this._formElement.reset();
    }
    _handleFormSubmit() {

        this._submitForm(this._getInputValues());
        this.closePopup();
    }
    closePopup() {
        super.closePopup();
        this._clearInputs();
        this._formElement.removeEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit()
        });
       
    
    }

    openPopup() {
        this._setEventListeners();
        super.openPopup();
    }
}