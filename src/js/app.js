import { mobileNav } from "./modules/mobile-nav.js";
import { tabs } from "./modules/tabs.js";
import {popupOpen} from './modules/popup.js';
import { formSlide } from "./modules/form-slide.js";
import { phoneMask } from "./modules/phone-mask.js";
import { formValid } from "./modules/form-valid.js";
import { YandexMaps } from "./modules/ymap.js";
import { mapList } from "./modules/map-item.js";
import { sliderStore } from "./modules/swiper.js";
import { verification } from "./modules/age-verification.js";

const popup = document.querySelector('.popup');
const map = document.querySelector('.map');



try {
    const age = document.querySelector('.age');
    if (age) {
        verification(age)
    }
} catch (error) {
    console.log(error);
}


/////////==== мобильное меню ====/////////

try {
    const header = document.querySelector('.header');
    if (header) {
        mobileNav('header');
    }
} catch (error) {
    console.log(error);
}

/////////==== TAB-переключатели для карты ====/////////

try {    
    if (map) {
        const mapBtns = map.querySelectorAll('.map__btn');
        const mapItems = map.querySelectorAll('.map__item');
        const dataset = 'data-map';
        const classNameBtn = 'map__btn';
        const classNameItem = 'map__item';
        tabs(mapBtns, mapItems, dataset, classNameBtn, classNameItem);
    }
} catch (error) {
    console.log(error);
}

/////////==== TAB-переключатели для локаций ====/////////
try {    
    if (map) {
        const mapBtn = map.querySelectorAll('.map-tab__btn');
        const mapItem = map.querySelectorAll('.map-list__size');
        const dataset = 'data-tab';
        const classNameBtn = 'map-tab__btn';
        const classNameItem = 'map-list__size';
        tabs(mapBtn, mapItem, dataset, classNameBtn, classNameItem);
    }
} catch (error) {
    console.log(error);
}



/////////==== карта магазинов ====/////////
try {
    const adresses = [
        {
            id: 1,
            coords: [59.913731, 30.438488],
            adress: 'Дальневосточный просп., 12, корп. 2',
            phone: '+7(911) 280-10-78',
            start: '10:00',
            end: '22:00',
            metro: 'white',
            link: 'store.html',
        }
    ];

    const URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';    
    const mapContainer = document.querySelector('.js-map');
    if (map || mapContainer) {        
        const listItems = mapContainer.querySelectorAll('[data-item-id]');
        const adressesCorrected = [...listItems].map(it => {
            let obj = {
                id: Number(it.dataset.itemId),
                coords: it.dataset.itemCoords.split(','),
                adress: it.dataset.itemAdress,
                phone: it.dataset.itemPhone,
                start: it.dataset.itemStart,
                end: it.dataset.itemEnd,
                metro: it.dataset.itemMetro,
                link: it.dataset.itemLink
            };
            return obj;
        });

        // передаём данные с dataset для стилизации listItems
        mapList(listItems); 

        //
        const obj = {
            containerId: 'map-1', // контейнер, куда загружается карта
            coords: adressesCorrected, // список адресов, которые выводим на карты
            url: URL, // адрес апи
            center: [59.938883, 30.316069], // центр карты
            zoom: 10, // величина зума
            find: true // возможность открытия бабла по клику вне карты
        };

        const mapInit = new YandexMaps(obj);
    };
} catch (error) {
    console.log(error);
}


/////////======== popup work ========/////////

try {
    const work = document.querySelector('.work')    
    if (work) {
        const popupOpenBtns = document.querySelectorAll('.popup__link')
        popupOpen(popupOpenBtns)
    }
} catch (error) {
    console.log(error);
}

/////////======== forma-slider ========/////////

try {
    if (popup) {
        formSlide(popup);
    }
} catch (error) {
    console.log(error);
}

//======= МАСКА ДЛЯ ТЕЛЕФОНА =======//
try {
    if (popup) {
        phoneMask(popup, 'popup');
    }
} catch (error) {
    console.log(error);
}

//======= ВАЛИДАЦИЯ ФОРМЫ =======//
try {
    if (popup) {
        formValid(popup, 'popup');
    }
} catch (error) {
    console.log(error);
}


//======= СЛАЙДЕР ДЛЯ МАГАЗИНА =======//
try {
    const slider = document.querySelector('.swiper');
    if (slider) {
        sliderStore(slider);
    }
} catch (error) {
    console.log(error);
}