import { sendForm } from "./send-form.js";
export function submitForm(form, btn, popup) {
    btn.addEventListener('click', e => {
        e.preventDefault();
        sendForm(form, popup);
    });
}