export function mobileNav(className) {
    //mobile nav
    const container = document.querySelector(`.${className}`);
    const menuMobile = container.querySelector('.nav-btn');
    const navMobile = container.querySelector(`.${className}-nav`);
    const iconBtn = container.querySelector('.nav-btn__icon');
    const body = document.querySelector('body');
    const section = document.querySelector('section');

    const clickMenuHandler = () => {
        navMobile.classList.toggle(`${className}__nav--active`);
        iconBtn.classList.toggle('nav-btn__icon--active');
        body.classList.toggle('modal-open');
        section.classList.toggle('modal-blur');
    }

    menuMobile.addEventListener('click', clickMenuHandler);

    document.addEventListener('click', e => {
        const target = e.target;
        if (!target.closest('.nav-btn') && !target.closest(`.${className}__nav`) || e.key === 'Escape' ) {
            navMobile.classList.remove(`${className}__nav--active`);
            iconBtn.classList.remove('nav-btn__icon--active');
            body.classList.remove('modal-open');
            section.classList.remove('modal-blur');
        }
    });

};