export function verification(age) {
    const ageYes = age.querySelector('.age__btn--yes');
    const ageNo = age.querySelector('.age__btn--no');

    // добавляем данные в localStorage
    const addLocalData = data => {
        localStorage.setItem('verification', data);
    };

    // Проверка данных в localStorage
    if (localStorage.getItem('verification') === 'true') {
        age.classList.remove('active');
    } else {
        const body = document.querySelector('body');
        
        const documentWidth = parseInt(document.documentElement.clientWidth);
        const windowWidth = parseInt(window.innerWidth);
        const scrollbarWidth = windowWidth - documentWidth;   
        
        age.classList.add('active');
    
        body.classList.add('modal-open');
        body.style.marginRight = `${scrollbarWidth}px`;
    
        // Yes
        ageYes.addEventListener('click', () => {
            addLocalData('true');
            location.reload();
        });
        // No
        ageNo.addEventListener('click', () => {
            addLocalData('false');
        });
    }
}