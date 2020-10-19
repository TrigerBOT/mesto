import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';
const buttonProfile = document.querySelector(`.profile__edit-button`);
const buttonPlace = document.querySelector(`.profile__add-button`);
const buttonAvatar = document.querySelector('.profile__overlay');
const formArray = {
    inputElement: '.popup__input',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
};
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-16", {
  authorization: "0100295d-ffab-4dd9-a2ae-64af071cc3da",
});


//отрисовка карточек
let cardList;
const successCardsInitial = (initialCards) =>{
    //секция с карточками
 cardList = new Section({
    items:initialCards,
    renderer: (card) => {
        newCard(card);
    }
}
, '.cards');
cardList.renderItems();
}

// всё о юзере
let userInfo;
const successUserInfo = (info) =>{

    userInfo = new UserInfo({
        name: '.profile__name' ,
        about: '.profile__about',
    
    },info)
    userInfo.setUserInfo(info);
} 
const errorUserInfo = (err)=>{
    console.log(err)
}

api.getUserInfo()
.then((info)=>{
    successUserInfo(info);
    api.getInitialsCards()
    .then(successCardsInitial)
    .catch(err => {
        console.log(err);
    })
})
.catch(errorUserInfo)


// функция при сабмите editProfile
const editSubmit = (evt,info)=>{
   evt.preventDefault();
    api.editUserInfo(info)
    .then(()=>{
        info.avatar = userInfo.getUserAvatar()
       userInfo.setUserInfo(info); 
    })
    .catch(err=>{
        console.log(err);
    })
    .finally(()=>{
        popupWithFormEdit.closePopup();
        
    })
}
//функция при сабмите newCard
const addSubmit = (evt,card)=>{
    evt.preventDefault();
    api.postCard(card)
    .then( (postedCard)=>{newCard(postedCard,true);} )
    .catch((err)=>{
        console.log(err);
    })
   .finally(()=>{
     popupWithFormAdd.closePopup();
     formPlace.checkButton();
   });
}
//удаление карточки 
const deleteSubmit = (card)=>{
  
    api.removeCard(card.getId())
    .then(()=>{
        card.deleteCard();
    })
    .catch(err=>{
        console.log(err);
    })
    .finally(()=>{
        popupConfirmForm.closePopup();
        
    })
}
//функция добавления карточки на сайт 
function newCard(card, isAdded = false){
    const cardObject= new Card(
        card,
       '#card-template',
   {
        handleCardClick: (name, link) => {
        popupWithImage.openPopup(name, link);
      }
      ,
      handleRemoveClick: (card) => {
        popupConfirmForm.openPopup(card);
      }
      ,
      handleLikeClick: (card) => {
        const cardLiked = card.isLiked(userInfo._id);
        if(cardLiked){
            api.unlikeCard(card.getId())
            .then((res) => {
              
                card.setLikes(res.likes);
                card.renderLike(userInfo._id);
           })
           .catch((ree)=> {
             console.log(ree);
           });
        }
        else{
            api.likeCard(card.getId()) 
            .then((res) => {
                card.setLikes(res.likes);
                card.renderLike(userInfo._id);
           })
           .catch((ree)=> {
             console.log(ree);
           });
        }
      }
    }
   ); 
   const cardElement = cardObject.renderCard(userInfo._id);
   cardList.addItem(cardElement, isAdded);
}
//смена аватара
const avatarSubmit = (link) =>{
    api.editAvatar(link)
    .then(()=>{
        api.getUserInfo()
        .then((info)=>{
    successUserInfo(info);
    })
    .catch(err=>{console.log(err);})
})
    .catch(err =>{console.log(err);})
    .finally(()=>{
        popupWithAvatar.closePopup();
        formAvatar.resetValidation();
    })
}
//попапы
const popupWithFormEdit = new PopupWithForm(
     '.popup[data-type ="profile_edit"]',
     editSubmit
)
const popupWithFormAdd = new PopupWithForm(
    '.popup[data-type ="place"]',
    addSubmit
)
const popupWithImage = new PopupWithImage('.popup[data-type="img"]');
const popupWithAvatar = new PopupWithForm('.popup[data-type="avatar"]',
avatarSubmit
);
const popupConfirmForm = new PopupConfirm(
    '.popup[data-type="confirm"]',
    
        deleteSubmit
    
  );
    
//Добавление слушателей для кнопок редактирования и добавления
buttonProfile.addEventListener('click', editButtonHandler);
function editButtonHandler () {
    
    const userObject =  userInfo.getUserInfo();
    popupWithFormEdit.fillInputs(userObject);   
    popupWithFormEdit.openPopup();
    profileValidation.checkButton();
}

buttonPlace.addEventListener('click', addButtonHandler);
function addButtonHandler () {
    popupWithFormAdd.openPopup();
    popupWithFormEdit.fillInputs({name:'',link:''}); 
    placeValidation.checkButton();
}
buttonAvatar.addEventListener('click',()=>{
    popupWithAvatar.openPopup();
})
//валидация 
const formProfile = document.querySelector('#form__edit'); // попап профиля
const formPlace = document.querySelector('#form__add'); // попап карточки
const formAvatar = document.querySelector('#form__avatar');// попап автара
const avatarValidation = new FormValidator(formArray,formAvatar)
const profileValidation = new FormValidator(formArray, formProfile);
const placeValidation = new FormValidator(formArray, formPlace);
profileValidation.enableValidation();
placeValidation.enableValidation();
avatarValidation.enableValidation();

// добавляем попапам обработчики
popupWithFormEdit.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();
popupConfirmForm.setEventListeners();
popupWithAvatar.setEventListeners();



