export function openPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', escClose);
};
export function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', escClose);
}

function escClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        console.log('dadadada')
        closePopup(popup)
    };
}
