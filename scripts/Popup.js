export default class Popup {
    constructor(datatype){
        this._type = datatype;
    }

    togglePopup(){
        if(document.querySelector(`.popup[data-type="${this._type}"`).classList.contains('popup__opened')){
            this.openPopup();
        }
        else {this.closePopup();}
    }
    openPopup() {
        document.querySelector(`.popup[data-type="${this._type}"`).classList.add('popup__opened');
        document.addEventListener('keydown', this.escClose(event));
    }
    closePopup() {
        document.querySelector(`.popup[data-type="${this._type}"`).classList.remove('popup__opened');
        document.removeEventListener('keydown', this.escClose(event));
    }
    escClose(Event) {
        if (Event.keyCode === 27) {
            if (document.querySelector(`.popup[data-type="${this._type}"`).classList.contains("popup__opened")) {
                this.closePopup();
            }
        };
    }


}