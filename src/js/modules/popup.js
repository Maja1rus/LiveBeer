export function popupOpen(popupOpenBtns) {
    // /* скрипт для popup */
    const body = document.querySelector('body');
    const popup = document.querySelector('.popup');
    let popupClose; // выносим определение на первый уровень, иначе нэти переменные не относятся к нашейц области видимости
    let popupContent;

    // scroll
    const documentWidth = parseInt(document.documentElement.clientWidth);
    const windowWidth = parseInt(window.innerWidth);
    const scrollbarWidth = windowWidth - documentWidth;

    const closePopupHandler = () => {
        popup.classList.remove('active');
        body.classList.remove('popup-open');
        body.style.removeProperty('margin-right');
        popupClose.removeEventListener('click', closePopupHandler); // при закрытии окна снимаем слушатель кнопки - он нам больше не нужен
        window.removeEventListener('keydown', escapeHandler); // при закрытии окна снимаем слушатель Эскейпа
        popupContent.removeEventListener('click', overlayClickHandler); // призакрытии окна снимаем слушатель клика по вуали
    }

    function escapeHandler(e) { // закрытие окна по кнопке escape
        if (e.key === 'Escape') {
            closePopupHandler();
        }
    };

    function overlayClickHandler(e) { // закрытие окна при клике на паранжу
        if (e.target === popupContent) {
            closePopupHandler();
        }
    };

    const openPopupHandler = (e) => {
        e.preventDefault();
        popup.classList.add('active');
        body.classList.add('popup-open');
        body.style.marginRight = `${scrollbarWidth}px`;

        popupClose = popup.querySelector('.popup__close'); // Задаем значение переменных в зависимости от того, какой попап открываем
        popupContent = popup.querySelector('.popup__body');

        popupClose.addEventListener('click', closePopupHandler); // слушаем клавишу Энтер по кнопке закрытия      

        popupContent.addEventListener('click', overlayClickHandler); // слушаем клик по паранже       
        window.addEventListener('keydown', escapeHandler); // слушаем клавишу Эскейп
    }

    popupOpenBtns.forEach(popupOpenBtn => {
        popupOpenBtn.addEventListener('click', openPopupHandler);
    })
}