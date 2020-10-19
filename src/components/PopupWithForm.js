import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._modalWindow.querySelector('.popup__form');
        this._submitButton = this._modalWindow.querySelector('.popup__submit');
        this._waitSelector = 'popup__submit_wait';
    }

    _getInputValues() {
        this._inputList = this._modalWindow.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        
            this._submitButton.classList.add(this._waitSelector);
            this._handleFormSubmit();

        } )

    }
    
    fillInputs(data){
     
        this._inputList = this._modalWindow.querySelectorAll('.popup__input');
        this._inputList.forEach(input =>input.value=data[input.name] );
    }
    _clearInputs(){
        this._formElement.reset();
    }
    _handleFormSubmit() {

        this._submitForm(event ,this._getInputValues());
       
    }
    closePopup() {
        super.closePopup();
      
        this._formElement.removeEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit()
        });
        this._clearInputs();
        this._submitButton.classList.remove(this._waitSelector);
    
    }

    openPopup() {
        super.openPopup();
    }
}