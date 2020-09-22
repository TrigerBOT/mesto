import { openPopup } from './index.js';
export default class Card {
  static _template = document.querySelector('#card-template').content;

  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._imgfull = document.querySelector(`.popup__img`);
    this._imgText = document.querySelector(`.popup__text`);
    this._popupImg = document.querySelector('.popup[data-type="img"]');
  }
  renderCards = () => {
    this._cloneCard = Card._template.cloneNode(true).children[0];

    this._img = this._cloneCard.querySelector(`.card__photo`);
    this._img.src = this._image;
    this._img.alt = this._text;
    this._cloneCard.querySelector('.card__title').textContent = this._text;
    this._delereCard();
    this._likeCard();
    this._popupCard();

    return this._cloneCard;

  }
  
  _delereCard() {
    this._cloneCard.querySelector('.card__delete').addEventListener('click', event => {
      event.target.closest('.card').remove();
    })
  }
  _likeCard() {
    this._cloneCard.querySelector('.card__like').addEventListener('click', event => {
      const likeCard = event.target.closest('.card__like');
      likeCard.classList.toggle('card__liked');
    })
  }

  _popupCard() {
    this._img.addEventListener('click', () => {
        
        this._imgfull.src = this._image;
        this._imgfull.alt = this._text;
        this._imgText.textContent = this._text;
        openPopup(this._popupImg);
      })
    }
}
