
let form = document.querySelector(`.popup__form`);
let formEdit = document.querySelector(`.profile__edit-button`);
let formClose = document.querySelector(`.popup__close`);
let formSub = document.querySelector(`.popup__submit`);
let name = document.querySelector(`.profile__name`);
let about = document.querySelector(`.profile__about`);
let nameInput = document.querySelector(`.popup__input_name`);
let aboutInput = document.querySelector(`.popup__input_about`);
let page = document.querySelector(`.page`);
let popup = document.querySelector(`.popup`)


function open() {

    popup.classList.add(`popup_opened`);
    nameInput.value = name.textContent;
    aboutInput.value = about.textContent;



}

function close() {
    popup.classList.remove(`popup_opened`);

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

formEdit.addEventListener('click', open);
formClose.addEventListener('click', close);
form.addEventListener('submit', save);
form.addEventListener("keyup", pressEnter);
