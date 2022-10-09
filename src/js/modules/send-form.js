import {sendData} from "./send-data.js";


export const sendForm = (form, popup) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const formList = JSON.stringify(data)

    sendData('https://jsonplaceholder.typicode.com/posts1', formList)
        .then(() => {
            form.reset()
        })
        .catch((err) => {
            console.log(err);
            const endPopup = popup.querySelector('.popup__end');
            const endTitle = popup.querySelector('.popup__end-title');
            const endSubtitle = popup.querySelector('.popup__end-subtitle');

            endTitle.innerHTML = 'Ошибка!';
            endSubtitle.innerHTML = 'К сожалению, вашу заявку обработать не удалось, попробуйте, пожалуйста, позже';
            endPopup.classList.add('popup__end--close');
        });
}