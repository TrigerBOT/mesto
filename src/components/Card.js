
export default class Card {


  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name;
    this._image = data.url;
    this._template = document.querySelector(`${cardSelector}`).content;
    this._imgText = document.querySelector(`.popup__text`);
    this._handleCardClick = handleCardClick;

  }
  
  _getTemplate() { 
    const cardElement = this._template.cloneNode(true); 
    this._element = cardElement; 
    return this._element; 
  }
  renderCard() {
    this._cloneCard = this._getTemplate();
    this._card = this._cloneCard.querySelector('.card');
    this._img = this._cloneCard.querySelector(`.card__photo`);
    this._img.src = this._image;
    this._img.alt = this._text;
    this._like = this._cloneCard.querySelector('.card__like');
    this._basket = this._cloneCard.querySelector('.card__delete');
    this._cloneCard.querySelector('.card__title').textContent = this._text;
    this._setEventListeners();

    return this._cloneCard;

  }
  _setEventListeners() {
    this._img.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    })
    this._basket.addEventListener("click", (evt) => { 
      this._deleteCard(evt); 
    }); 
    this._like.addEventListener("click", (evt) => { 
      this._likeCard(evt); 
    }); 
  }
  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }
  _likeCard(evt) {
    evt.target.classList.toggle("card__liked");
  }


}

 
