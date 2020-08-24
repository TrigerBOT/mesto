const form = document.querySelector(`.popup__form`);
const buttonProfile = document.querySelector(`.profile__edit-button`);
const formClose = document.querySelector(`.popup__close`);
const formSub = document.querySelector(`.popup__submit`);
const buttonPlace = document.querySelector(`.profile__add-button`);
const name = document.querySelector(`.profile__name`);
const about = document.querySelector(`.profile__about`);
const nameInput = document.querySelector(`.popup__input_name`);
const aboutInput = document.querySelector(`.popup__input_about`);
const page = document.querySelector(`.page`);
const popup = document.querySelector(`.popup`);
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

const SectionCards = document.querySelector(`.cards`);
function renderCards(card) {
    const TemplateCards = document.querySelector(`#card-template`).content.cloneNode(true);
    TemplateCards.querySelector(`.card__photo`).src = card.link;
    TemplateCards.querySelector(`.card__title`).textContent = card.name;

    const likeB = TemplateCards.querySelector('.card__like');
    likeB.addEventListener('click', like);
    const delB = TemplateCards.querySelector('.card__delete');
    delB.addEventListener('click', del);
    const img = TemplateCards.querySelector('.card__photo');
    img.addEventListener('click', () => {
        togglePopup(popupImg);
        imgfull.src = card.link;
        imgText.textContent = card.name;
    });
    return TemplateCards;

}


initialCards.forEach((card) => {
    // card из массива всего лишь заготовка для создания карточки
    // createCard вернет карточку в виде html-разметки,
    // которую тут же добавляем на страницу через append
    SectionCards.append(renderCards(card));
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

function vals(e) {
    e.preventDefault();
    card.name = placeNameInput.value;
    card.link = linkInput.value;
    console.log(card.name);
    SectionCards.append(renderCards(card));

}

function like(event) {
    event.target.classList.toggle('card__liked');
    event.stopPropagation();
}
function del(event) {
    const place = document.querySelector('.card');
    place.remove();
    event.stopPropagation();
}



function save(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
}
function pressEnter(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        formSub.click();
    }
}
const popupProfile = document.querySelector('.popup[data-type="profile_edit"]'); // попап профиля
const popupPlace = document.querySelector('.popup[data-type="place"]'); // попап добавления карточки
const popupImg = document.querySelector('.popup[data-type="img"]')
// функция, которая делает видимым или скрытым тот попап, который передан ей в качестве аргумента
function togglePopup(pop) {
    pop.classList.toggle('popup__opened');
}

// функция открытия попапа редактирования профиля - по сути обработчик события клика
function openProfileForm() {
    togglePopup(popupProfile);
    aboutInput.value = about.textContent;
    nameInput.value = name.textContent;
     // popupProfile - передаем, чтобы открылся попап профиля
}
// функция открытия попапа добавления карточки
function openPlaceForm() {
    togglePopup(popupPlace); // popupPlace - чтобы открыть попап добавления карточки
}
buttonProfile.addEventListener('click', openProfileForm); // кнопка открытия формы профиля
buttonPlace.addEventListener('click', openPlaceForm); // кнопка открытия формы для карточки

// добавляем обработчик для всех кнопок закрытия попапов на странице
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', (event) => {
        togglePopup(event.target.closest('.popup'));
    });
});

form.addEventListener('submit', save);
form.addEventListener("keyup", pressEnter);
popCard.addEventListener('submit', vals);