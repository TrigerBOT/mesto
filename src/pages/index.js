import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
const buttonProfile = document.querySelector(`.profile__edit-button`);
const buttonPlace = document.querySelector(`.profile__add-button`);

const formArray = {
    inputElement: '.popup__input',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
};




const initialCards = [
    {
        name: 'Архыз',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];


   
const userInfo = new UserInfo({
    name: '.profile__name' ,
    about: '.profile__about',

})
userInfo.setUserInfo({name:'Жак',about:'Океанолог'})




const popupWithFormEdit = new PopupWithForm(
     '.popup[data-type ="profile_edit"]',
     (data) => {
        userInfo.setUserInfo(data);
        console.log(data);
    }
)

function newCard(item){
    return new Card(
        item,
       '#card-template',
       (name, url) => {
           popupWithImage.openPopup(name, url);
       },
   ); 
}
const popupWithFormAdd = new PopupWithForm(
    '.popup[data-type ="place"]',
        (data) => {
            const cardList = new Section({
                items:data,
                renderer:(item) => {
                    const card= newCard(item);
                    const cardElement = card.renderCard();
                    cardList.addItem(cardElement);
                }
            }
            , '.cards')
            cardList.renderItems(false);
        }    
)
const cardList = new Section({
    items:initialCards,
    renderer:(item) => {
        const card= newCard(item);
        const cardElement = card.renderCard();
        cardList.addItem(cardElement);
    }
}
, '.cards')
cardList.renderItems(true);

//Добавление слушателей для кнопок редактирования и добавления
function editButtonHandler () {
    const userObject =  userInfo.getUserInfo();
   
    popupWithFormEdit.fillInputs(userObject);
    profileValidation.enableValidation();
    popupWithFormEdit.openPopup();
}
buttonProfile.addEventListener('click', editButtonHandler);

function addButtonHandler () {
    placeValidation.enableValidation()
    popupWithFormAdd.openPopup();
}
buttonPlace.addEventListener('click', addButtonHandler);





const formProfile = document.querySelector('#form__edit'); // попап профиля
const formPlace = document.querySelector('#form__add'); // попап карточки




const popupWithImage = new PopupWithImage('.popup[data-type="img"]');

// добавляем попапам обработчики
popupWithFormEdit.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAdd.setEventListeners();



const profileValidation = new FormValidator(formArray, formProfile);
const placeValidation = new FormValidator(formArray, formPlace);
profileValidation.enableValidation();
placeValidation.enableValidation();






