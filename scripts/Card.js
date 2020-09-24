import { openPopup } from './utils.js';
export default class Card {


  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._template = document.querySelector(`${cardSelector}`).content;
    this._imgfull = document.querySelector(`.popup__img`);
    this._imgText = document.querySelector(`.popup__text`);
    this._popupImg = document.querySelector('.popup[data-type="img"]');

  }
  renderCard = () => {

    this._cloneCard = this._template.cloneNode(true);

    this._img = this._cloneCard.querySelector(`.card__photo`);
    this._img.src = this._image;
    this._img.alt = this._text;
    this._cloneCard.querySelector('.card__title').textContent = this._text;
    this._deleteCard();
    this._likeCard();
    this._popupCard();

    return this._cloneCard;

  }

  _deleteCard() {
    this._cloneCard.querySelector('.card__delete').addEventListener('click', event => {
      this._cloneCard.closest('.card').remove();
    })
  }
  _likeCard() {
    this._cloneCard.querySelector('.card__like').addEventListener('click', event => {
      const likeCard = this._cloneCard.closest('.card__like');
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
