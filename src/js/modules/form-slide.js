export function formSlide(popup) {
    // Получаем переменные

    const btnNexts = popup.querySelectorAll('.popup-btn__next');
    
    /* Индекс слайда по умолчанию */
    let slideIndex = 1;
    showSlides(slideIndex);
    
    /* Функция увеличивает индекс на 1, показывает следующй слайд*/
    function plusSlide() {
        showSlides((slideIndex += 1));
    }
    
    /* Основная функция сладера */
    function showSlides(n) {
        let slides = document.getElementsByClassName('popup__wrap');
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
    
        slides[slideIndex - 1].style.display = 'grid';
    }
    btnNexts.forEach(btnNext => {
        btnNext.addEventListener('click', e => {
            e.preventDefault();
            plusSlide();
        });
    });
}
