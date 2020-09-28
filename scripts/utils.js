import {popups} from './index.js';
export function openPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', escClose);
};
export function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', escClose);}

    function escClose(evt) {
        if (evt.which === 27) {
            popups.forEach((popup) => {
                if (popup.classList.contains("popup_opened")) {
                    closePopup(popup);
                }
            });
        }
    }