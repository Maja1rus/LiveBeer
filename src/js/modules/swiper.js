import Swiper, { Navigation } from 'swiper';
export function sliderStore(slider) {
    const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        grabCursor: true,
        breakpoints: {
            '@0.00': {
                slidesPerView: 2,
                spaceBetween: 10
            },
            '@0.45': {
                slidesPerView: 3,
                spaceBetween: 10
            },
            '@0.60': {
                slidesPerView: 4,
                spaceBetween: 20
            },
            '@0.90': {
                slidesPerView: 5,
                spaceBetween: 20
            },
            '@1.10': {
                slidesPerView: 5,
                spaceBetween: 20
            },
            '@1.20': {
                slidesPerView: 6,
                spaceBetween: 20
            },
            '@1.30': {
                slidesPerView: 7,
                spaceBetween: 20
            }
        },
        modules: [Navigation],
        navigation: {
            nextEl: '.slider__next',
            prevEl: '.slider__prev'
        }
    });
}