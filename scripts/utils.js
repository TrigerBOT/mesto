export function openPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', escClose);
};
export function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', escClose);}
