import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imgfull = document.querySelector(`.popup__img`);
        this._popupImageText= this._modalWindow.querySelector('.popup__text')
    }
    openPopup(name, url) {
        this._popupImageElement = this._imgfull;
        this._popupImageElement.setAttribute('src', url);
        this._popupImageElement.setAttribute('alt', name);
        this._popupImageText.textContent = name;
        super.openPopup();
    }
}