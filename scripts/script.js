const form = document.querySelector(`.popup__form`);
const buttonProfile = document.querySelector(`.profile__edit-button`);
const formClose = document.querySelector(`.popup__close`);

const buttonPlace = document.querySelector(`.profile__add-button`);
const name = document.querySelector(`.profile__name`);
const about = document.querySelector(`.profile__about`);
const nameInput = document.querySelector(`.popup__input_name`);
const aboutInput = document.querySelector(`.popup__input_about`);
const page = document.querySelector(`.page`);
const popup = document.querySelector(`.popup`);
const popAdd = document.querySelector(`#form__add`);
const imgfull = document.querySelector(`.popup__img`);
const imgText = document.querySelector(`.popup__text`);
const popCard = document.querySelector(`.popup__create`);


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

const sectionCards = document.querySelector(`.cards`);
function renderCards(card) {
    const templateCards = document.querySelector(`#card-template`).content.cloneNode(true);
    const cardPhoto = templateCards.querySelector(`.card__photo`);
    cardPhoto.src = card.link;
    cardPhoto.alt = card.name;
    templateCards.querySelector(`.card__title`).textContent = card.name;

    const likeButton = templateCards.querySelector('.card__like');
    likeButton.addEventListener('click', like);
    const deleteButton = templateCards.querySelector('.card__delete');
    deleteButton.addEventListener('click', (deleteCard));
    const img = templateCards.querySelector('.card__photo');
    img.addEventListener('click', () => {
        togglePopup(popupImg);
        imgfull.src = card.link;
        imgfull.alt = card.name;
        imgText.textContent = card.name;
    });
    return templateCards;

}


initialCards.forEach((card) => {
    createCard(card);
});
const placeNameInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const addForm = document.querySelector('.popup__form_add');

const card = [
    {
        name: placeNameInput.value,
        link: linkInput.value
    }
];

function createCard(obj) {
    sectionCards.prepend(renderCards(obj));
}

function newCard(event) {

    card.name = placeNameInput.value;
    card.link = linkInput.value;
    createCard(card);
    togglePopup(event.target.closest('.popup'));
    event.preventDefault();
    placeNameInput.value = '';
    linkInput.value = '';

}

function like(event) {
    event.target.classList.toggle('card__liked');
}
function deleteCard(event) {
    const place = event.target.closest('.card');
    place.remove();

}



function save(event) {

    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    togglePopup(event.target.closest('.popup'));
    event.preventDefault();
}

const popupProfile = document.querySelector('.popup[data-type="profile_edit"]'); // попап профиля
const popupPlace = document.querySelector('.popup[data-type="place"]'); // попап карточки
const popupImg = document.querySelector('.popup[data-type="img"]')

function togglePopup(pop) {
    pop.classList.toggle('popup__opened');
}

function openProfileForm() {
    togglePopup(popupProfile);
    aboutInput.value = about.textContent;
    nameInput.value = name.textContent;

}
function openPlaceForm() {
    togglePopup(popupPlace);
}
buttonProfile.addEventListener('click', openProfileForm); // кнопка профиля
buttonPlace.addEventListener('click', openPlaceForm); // кнопка карточки

// добавляем обработчик для всех кнопок закрытия попапов на странице
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', (evt) => {
        togglePopup(evt.target.closest('.popup'));
    });
});
const popups = Array.from(document.querySelectorAll('.popup'));
function escClose(evt) {
    if (evt.keyCode === 27) {
        popups.forEach((popup) => {
            if (popup.classList.contains("popup__opened")) {
                togglePopup(popup);
            }
        });
    }
}
document.addEventListener("keydown", escClose);
//закрытие при нажатии на overlay

document.querySelectorAll('.popup__overlay').forEach((over) => {
    over.addEventListener('click', (evt) => {
        togglePopup(evt.target.closest('.popup'));
    });

})


form.addEventListener('submit', save);
popAdd.addEventListener('submit', newCard);


