
let form = document.querySelector(`.form`);
let formBack = document.querySelector(`.form__background`);
let formEdit = document.querySelector(`.profile__edit-button`);
let formClose = document.querySelector(`.form__close`);
let formSub = document.querySelector(`.form__submit`);
let name = document.querySelector (`.profile__name`);
let about = document.querySelector(`.profile__about`);
let nameInput = document.querySelector(`.form__name`);
let aboutInput = document.querySelector(`.form__about`);
let page = document.querySelector(`.page`);
let popup = document.querySelector(`.popup`)



function open(){
    form.style.display = "flex";
    formBack.style.display = "flex";
    popup.style.display = "flex"
    nameInput.value= name.textContent;
    aboutInput.value = about.textContent;
   
    
 }

 function close(){
    form.style.display = "none";
    formBack.style.display = "none";
    popup.style.display = "none";
 }


function save(event){
    event.preventDefault()
    name.innerHTML = nameInput.value + ` <img src="./images/Edit Button.svg" alt="Ред." class="profile__edit-button">`;
            formEdit = document.querySelector(`.profile__edit-button`);
            formEdit.addEventListener('click', open );
    about.textContent = aboutInput.value;
    close();
}
formEdit.addEventListener('click', open );
formClose.addEventListener('click', close );
formSub.addEventListener('click', save );
