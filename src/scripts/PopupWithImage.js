import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    openPopup(name, url) {
        this._popupImageElement =  this._modalWindow.querySelector('.popup__img')
        this._popupImageElement.setAttribute('src', url);
        this._popupImageElement.setAttribute('alt', name);
        this._modalWindow.querySelector('.popup__text').textContent = name;

        super.openPopup();
    }
}