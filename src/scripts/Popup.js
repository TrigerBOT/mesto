export default class Popup {
    constructor(popupSelector) {
        this._modalWindow = document.querySelector(`${popupSelector}`);
        this._handleEscClose= evt => {
            if (evt.key === 'Escape') {   
                this.closePopup();
            };
        }
    }
   
  
    openPopup() {
        this._modalWindow.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup() {
        this._modalWindow.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    

    setEventListeners() {
        const button = this._modalWindow.querySelector('.popup__close')
        button.addEventListener('click', () => {
            this.closePopup();
        });


        const over = this._modalWindow.querySelector('.popup__overlay');
        over.addEventListener('click', () => {
            this.closePopup();
        });


    }
}








