let form = document.querySelector(`.popup__form`);
let formEdit = document.querySelector(`.profile__edit-button`);
let formClose = document.querySelector(`.popup__close`);
let formSub = document.querySelector(`.popup__submit`);
let pop_addCard = document.querySelector(`.popup-add`);
let addBut = document.querySelector(`.profile__add-button`);
let name = document.querySelector(`.profile__name`);
let about = document.querySelector(`.profile__about`);
let nameInput = document.querySelector(`.popup__input_name`);
let aboutInput = document.querySelector(`.popup__input_about`);
let page = document.querySelector(`.page`);
let popup = document.querySelector(`.popup`);
let popup_img =document.querySelector(`.popup-img`);
let imgfull = document.querySelector(`.popup-img__img`);
let img_text = document.querySelector(`.popup-img__text`);

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

let SectionCards = document.querySelector(`.cards`);
function renderCards (card) {
    const TemplateCards = document.querySelector(`#card-template`).content.cloneNode(true);
    TemplateCards.querySelector(`.card__photo`).src =  card.link;
    TemplateCards.querySelector(`.card__title`).textContent = card.name;
    const likeB= TemplateCards.querySelector('.card__like');
    likeB.addEventListener('click',like);
    const delB = TemplateCards.querySelector('.card__delete');
    delB.addEventListener('click',del);
    const img = TemplateCards.querySelector('.card__photo');

    img.addEventListener('click', () => {
        popup_img.classList.add('popup_opened');
        imgfull.src = card.link;
        img_text.textContent = card.name;
    });
    const popupImageClose = document.querySelector('.popup-img__close');
        popupImageClose.addEventListener('click', () => {
            popup_img.classList.remove('popup_opened');
            imgfull.src= '';
            img_text.textContent= ''; 
    })
    SectionCards.append(TemplateCards);
    
}
initialCards.forEach(renderCards);

const placeNameInput = document.querySelector('.popup__input_place');
const linkInput = document.querySelector('.popup__input_link');
const addForm = document.querySelector('.popup__form_add');

let card = [
    {
        name:placeNameInput.value,
        link:linkInput.value
    }
];
function addCard(card){
    const TemplateCards = document.querySelector(`#card-template`).content.cloneNode(true);
    TemplateCards.querySelector(`.card__photo`).src =  card.link;
    TemplateCards.querySelector(`.card__title`).textContent = card.name;
    const likeB= TemplateCards.querySelector('.card__like');
    likeB.addEventListener('click', like);
    const delB = TemplateCards.querySelector('.card__delete');
    delB.addEventListener('click',del);
    const img = TemplateCards.querySelector('.card__photo');

    img.addEventListener('click', () => {
        popup_img.classList.add('popup_opened');
        imgfull.src = card.link;
        img_text.textContent = card.name;
    });
    const popupImageClose = document.querySelector('.popup-img__close');
        popupImageClose.addEventListener('click', () => {
            popup_img.classList.remove('popup_opened');
            imgfull.src= '';
            img_text.textContent= ''; 
    })
    SectionCards.prepend(TemplateCards);
    close_add();
}
function vals(e){
    e.preventDefault();
    card.name=placeNameInput.value;
    card.link=linkInput.value;
    console.log(card.name);
    addCard(card);
}

function like(event) {
    event.target.classList.toggle('card__liked');
    event.stopPropagation();
}
function del(event){
    const place = document.querySelector('.card');
    place.remove();
    event.stopPropagation();
}
function full(event){
    popup_img.classList.add(`popup_opened`);

}

function open() {

    popup.classList.add(`popup_opened`);
}
function openAdd(){
    pop_addCard.classList.add(`popup_opened`);
    nameInput.value = name.textContent;
    aboutInput.value = about.textContent;
}
const popupClose = document.querySelector('.popup-add__close');
function close_add() {
    pop_addCard.classList.remove('popup_opened');
}
function close() {
    popup.classList.remove(`popup_opened`);
}
function close_img(){
    
}
function save(event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    close();
}
function pressEnter(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        formSub.click();
    }
}



addBut.addEventListener('click', openAdd);
formEdit.addEventListener('click', open);
formClose.addEventListener('click', close);
popupClose.addEventListener('click', close_add);
form.addEventListener('submit', save);
form.addEventListener("keyup", pressEnter);
pop_addCard.addEventListener('submit', vals);