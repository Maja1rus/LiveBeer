import { debounce} from './debounce.js';
import { submitForm } from './submit-form.js';

export function formValid(popup) {
    const form = popup.querySelector('.popup__form');
    const formBtnNext = popup.querySelector('.popup-btn__next');
    const formBtnEnd = popup.querySelector('.popup-btn__end');
    const formInputs = popup.querySelectorAll('.popup__input');

    //отключение кнопки
    function btnDisabled(btn) {
        btn.setAttribute('disabled', true);
    }
    btnDisabled(formBtnNext);
    btnDisabled(formBtnEnd);

    function btnActive(btn) {
        btn.removeAttribute('disabled');
    }

    let checkName, checkBirtdate, checkPhone;
    let checkCity, checkMetro;

    function inputCheck(item) {
        let rule = item.dataset.input;
        let value = item.value;
        switch (rule) {
            case 'name':
                checkName = /^$/.test(value);
                break;
            case 'birthdate':
                checkBirtdate = /^$/.test(value);
                break;
            case 'phone':
                checkPhone = /^$/.test(value);
                break;
            case 'city':
                checkCity = /^$/.test(value);
                break;
            case 'metro':
                checkMetro = /^$/.test(value);
                break;
        }
        if (
            checkName === false &&
            (checkBirtdate === false || checkBirtdate === undefined) &&
            checkPhone === false
        ) {
            btnActive(formBtnNext);
            checkCity === false && checkMetro === false ?
                btnActive(formBtnEnd) :
                btnDisabled(formBtnEnd);
        } else {
            btnDisabled(formBtnNext);
        }
    }
    const inputCheckHandler = debounce(inputCheck, 500);

    for (let input of [...formInputs]) {
        input.addEventListener('keyup', () => {
            inputCheckHandler(input);
        });
    }

    submitForm(form, formBtnEnd, popup)
}