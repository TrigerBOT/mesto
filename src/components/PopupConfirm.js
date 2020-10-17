import Popup from './Popup.js';
export default class PopupConfirm extends Popup{
    constructor(popupSelector,submitHandler){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._modalWindow.querySelector('.popup__form');
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", () => {
          this._submitHandler(this._confirmParam);
        });
      }

    
      openPopup(confirmParam) {
        this._confirmParam = confirmParam;
        super.openPopup();
       
      }
    
}