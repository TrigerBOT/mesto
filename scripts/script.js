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
const popAdd = document.getElementById(`form__add`);
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
    let cardPhoto = TemplateCards.querySelector(`.card__photo`);
    cardPhoto.src = card.link;
    cardPhoto.alt = card.name;
    TemplateCards.querySelector(`.card__title`).textContent = card.name;

    const likeB = TemplateCards.querySelector('.card__like');
    likeB.addEventListener('click', like);
    const delB = TemplateCards.querySelector('.card__delete');
    delB.addEventListener('click', (del));
    const img = TemplateCards.querySelector('.card__photo');
    img.addEventListener('click', () => {
        togglePopup(popupImg);
        imgfull.src = card.link;
        imgfull.alt = card.name;
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

function vals(event) {
    
    card.name = placeNameInput.value;
    card.link = linkInput.value;
    SectionCards.prepend(renderCards(card));
    togglePopup(event.target.closest('.popup'));
    event.preventDefault();
}

function like(event) {
    event.target.classList.toggle('card__liked');
    event.stopPropagation();
}
function del(event) {
    const place = event.target.closest('.card');
    place.remove();
    event.stopPropagation();
}



function save(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    togglePopup(event.target.closest('.popup'));
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
document.querySelectorAll('.popup').forEach((popup)=>{
    popup.addEventListener('keydown', (evt) =>{
    if(evt.key === 'Escape'){
        togglePopup(evt.target.closest('.popup'));
    }
    })
});
//закрытие при нажатии на overlay

document.querySelectorAll('.popup__overlay').forEach((over)=>{
    over.addEventListener('click',(evt)=>{
        togglePopup(evt.target.closest('.popup'));
    });

})


form.addEventListener('submit', save);
popAdd.addEventListener('submit', vals);


//Валидация  карточек
const formSub = document.querySelector(`.popup__submit`);
const formNew = document.forms.addCard;
const ERROR_REQUIRE_TEXT = 'Это обязательное поле';
const ERROR_LENGTH_TEXT = 'Должно быть от 2 до 30 символов';
const ERROR_LINK_TEXT = 'Здесь должна быть ссылка';
const MIN_LEN = 2;

function addDisabledForButton() {    
    const inputs = Array.from(document.querySelectorAll('form[name=addCard] input'));
    const isValideForm = inputs.every((elem) => {
        return elem.checkValidity();
    });

    if(isValideForm) {
        
        document.forms.addCard[3].removeAttribute('disabled', true);
        document.forms.addCard[3].classList.remove('popup__create_disabled');
    } else {   
       
        document.forms.addCard[3].setAttribute('disabled', true);
        document.forms.addCard[3].classList.add('popup__create_disabled');
    }
}



// валидация "редактировать профиль" 
const formProfile = document.forms.profile_edit;

function addDisabledForEditButton() {
    const inputs = Array.from(document.querySelectorAll('form[name=profile_edit] input[type=text]'));
    const isValideForm = inputs.every((elem) => {
        return elem.checkValidity();
    });

    if(isValideForm) {
        formSub.removeAttribute('disabled', true);
        formSub.classList.remove('popup__submit_disabled');
        document.forms.profile_edit[1];
        document.forms.profile_edit[2].border;
    } else {   
        formSub.setAttribute('disabled', true);
        formSub.classList.add('popup__submit_disabled');
    }
}

formProfile.addEventListener('input', (evt) =>  {
    const target = evt.target;	
   
    if (target.validity.valueMissing) { 
        target.nextSibling.nextSibling.textContent = ERROR_REQUIRE_TEXT;
        target.nextSibling.nextSibling.classList.add('popup__input-error_active');
        
    } else if (target.value.length > 0 && target.value.length < MIN_LEN) {
        target.nextSibling.nextSibling.textContent = ERROR_LENGTH_TEXT;
        target.nextSibling.nextSibling.classList.add('popup__input-error_active');
    } else {
        target.nextSibling.nextSibling.textContent = '';
        target.nextSibling.nextSibling.classList.remove('popup__input-error_active');
    }
})

formNew.addEventListener('input', (evt) =>  {
    const link = formNew.link;	
    const target = evt.target;

    if (target.validity.valueMissing) { 
        target.nextSibling.nextSibling.textContent = ERROR_REQUIRE_TEXT;
        target.nextSibling.nextSibling.classList.add('popup__input-error_active');
    
    } else if(target.value.length > 0 && target.value.length < MIN_LEN) {
        target.nextSibling.nextSibling.textContent = ERROR_LENGTH_TEXT;
        target.nextSibling.nextSibling.classList.add('popup__input-error_active');
      
    } else {
        target.nextSibling.nextSibling.textContent = '';
        target.nextSibling.nextSibling.classList.remove('popup__input-error_active');
    }     
    if (link.validity.valueMissing) {
        link.nextSibling.nextSibling.textContent = ERROR_REQUIRE_TEXT;
        link.nextSibling.nextSibling.classList.add('popup__input-error_active');
    } else if(!link.validity.valid) {
        link.nextSibling.nextSibling.textContent = ERROR_LINK_TEXT; 
        link.nextSibling.nextSibling.classList.add('popup__input-error_active');
    } 
})
addDisabledForButton();
formNew.addEventListener('input',addDisabledForButton);
formProfile.addEventListener('input', addDisabledForEditButton);