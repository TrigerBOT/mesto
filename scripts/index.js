import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
const form = document.querySelector(`.popup__form`);
const buttonProfile = document.querySelector(`.profile__edit-button`);
const buttonPlace = document.querySelector(`.profile__add-button`);
const name = document.querySelector(`.profile__name`);
const about = document.querySelector(`.profile__about`);
const nameInput = document.querySelector(`.popup__input_name`);
const aboutInput = document.querySelector(`.popup__input_about`);
const popAdd = document.querySelector(`#form__add`);
const formArray = {
    inputElement: '.popup__input',
    errorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
};


const placeNameInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
aboutInput.value = about.textContent;
nameInput.value = name.textContent;
const sectionCards = document.querySelector(`.cards`);
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];
initialCards.forEach((element) => {
    const card = new Card(element, `#card-template`).renderCard();
    sectionCards.append(card);
})


function newCard(event) {
    const card = {
        name: placeNameInput.value,
        link: linkInput.value
    }
    const cardElement = new Card(card, `#card-template`).renderCard();
    sectionCards.prepend(cardElement);
    closePopup(event.target.closest('.popup'));
    placeNameInput.value = '';
    linkInput.value = '';

    event.preventDefault();

}

function save(event) {

    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    closePopup(event.target.closest('.popup'));
    event.preventDefault();
}
const popupProfile = document.querySelector('.popup[data-type ="profile_edit"]');
const popupPlace = document.querySelector('.popup[data-type="place"]');
const formProfile = document.querySelector('#form__edit'); // попап профиля
const formPlace = document.querySelector('#form__add'); // попап карточки

const profileValidation = new FormValidator(formArray, formProfile);
const placeValidation = new FormValidator(formArray, formPlace);
profileValidation.enableValidation();
placeValidation.enableValidation();
function toggleProfileForm() {
    if (popupProfile.classList.contains('popup_opened')) {
        closePopup(popupProfile);
    }
    else {
        openPopup(popupProfile);
        aboutInput.value = about.textContent;
        nameInput.value = name.textContent;
    }
}
function togglePlaceForm() {
    if (popupPlace.classList.contains('popup_opened')) {
        closePopup(popupProfile);
    }
    else {
        openPopup(popupPlace);
    }
}

buttonProfile.addEventListener('click', toggleProfileForm); // кнопка профиля
buttonPlace.addEventListener('click', togglePlaceForm); // кнопка карточки

// добавляем обработчик для всех кнопок закрытия попапов на странице
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', (evt) => {
        closePopup(evt.target.closest('.popup'));
    });
});
export const popups = Array.from(document.querySelectorAll('.popup'));

document.querySelectorAll('.popup__overlay').forEach((over) => {
    over.addEventListener('click', (evt) => {
        closePopup(evt.target.closest('.popup'));
    });

})


form.addEventListener('submit', save);
popAdd.addEventListener('submit', newCard);


