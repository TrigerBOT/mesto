import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm  from './scripts/PopupWithForm.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import './pages/index.css';
const buttonProfile = document.querySelector(`.profile__edit-button`);
const buttonPlace = document.querySelector(`.profile__add-button`);
const name = document.querySelector(`.profile__name`);
const about = document.querySelector(`.profile__about`);
const nameInput = document.querySelector(`.popup__input_name`);
const aboutInput = document.querySelector(`.popup__input_about`);
const formArray = {
    inputElement: '.popup__input',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
};


aboutInput.value = about.textContent;
nameInput.value = name.textContent;

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

const cardList = new Section({
    items:initialCards,
    renderer:(item) => {
        const card = new Card(
             item,
            '#card-template',
            (name, link) => {
                popupWithImage.openPopup(name, link);
            },
        )
        const cardElement = card.renderCard();
        cardList.setItem(cardElement);
    }
}
, '.cards')
cardList.renderItems()
   
const userInfo = new UserInfo({
    name: name,
    about: about,

})





const popupWithFormEdit = new PopupWithForm(
     '.popup[data-type ="profile_edit"]',
     (data) => {
        userInfo.setUserInfo(data);
        name.textContent = data.name;
        about.textContent = data.about;
    }
)

const popupWithFormAdd = new PopupWithForm(
    '.popup[data-type ="place"]',
        (data) => {
            const cardNew = new Section({
                items:data,
                renderer:(item) => {
                    const card = new Card(
                         item,
                        '#card-template',
                        (name, url) => {
                            popupWithImage.openPopup(name, url);
                        },
                    )
                    const cardElement = card.renderCard();
                    cardNew.setItem(cardElement);
                }
            }
            , '.cards')
            cardNew.renderItems();
        }    
)


//Добавление слушателей для кнопок редактирования и добавления
function editButtonHandler () {
    const userObject =  userInfo.getUserInfo();
    name.value = userObject.name;
    about.value = userObject.about;
    profileValidation.enableValidation();
    popupWithFormEdit.openPopup();
}
buttonProfile.addEventListener('click', editButtonHandler);

function addButtonHandler () {
    placeValidation.enableValidation()
    popupWithFormAdd.openPopup();
}
buttonPlace.addEventListener('click', addButtonHandler);





const popupPlace = document.querySelector('.popup[data-type="place"]');
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






