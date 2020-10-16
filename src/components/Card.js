
export default class Card {


  constructor(data, cardSelector, funсtions) {
   //селекторы 
    this._template = document.querySelector(`${cardSelector}`).content;
    this._liked = `.card__liked`;
    this._imgText = document.querySelector(`.popup__text`);
    this._counter = `.card__counter`;

    //свойства карточки 
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._createdAt = data.createdAt;

    //functions
    this._handleCardClick = funсtions.handleCardClick;
    this._handleRemoveClick = funсtions.handleRemoveClick;
    this._handleLikeClick = funсtions.handleLikeClick;
  }


  _getTemplate() { 
    const cardElement = this._template.cloneNode(true); 
    this._element = cardElement; 
    return this._element; 
  }
  
  _setEventListeners() {
    this._img.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    this._basket.addEventListener("click", () => { 
      this._handleRemoveClick(); 
    }); 
    this._like.addEventListener("click", () => { 
      this._handleLikeClick();
    }); 
  }

 deleteCard() {
    this._cloneCard.remove();
    this._cloneCard = null;
  }

  isLiked(currentUser) {
   this._likes.includes(currentUser);
  
  }

  //  о лайках
  renderLike(currentUser) {
 
    if (this.isLiked(currentUser)) {
      console.log(this.isLiked(currentUser));
      this._like.classList.add(`card__liked`);
    } else {
   
      this._like.classList.remove(`card__liked`);
    }
    
  }


  renderCard(currentUser) {
    this._cloneCard = this._getTemplate();
    this._card = this._cloneCard.querySelector('.card');
    this._img = this._cloneCard.querySelector(`.card__photo`);
    this._img.src = this._link;
    this._img.alt = this._name;
  
    this._like = this._cloneCard.querySelector('.card__like');

    this._basket = this._cloneCard.querySelector('.card__delete');
    this._cloneCard.querySelector('.card__title').textContent = this._name;
    this.renderLike(currentUser);
    this.setLikes(this._likes);
    this._setEventListeners();

    return this._cloneCard;

  }
  getId(){
    return this._id;
  }

  setLikes(likes) {
    this._likes = likes;
    this._cloneCard.querySelector(`${this._counter}`).textContent = this._likes.length;
  }


}

 
