const URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

export class YandexMaps {
    constructor({
        container,
        containerId,
        coords,
        url,
        center,
        zoom,
        find
    }) {
        this.containerId = containerId || null; // контейнер, в который будет грузиться карта
        this.container = container || document.querySelector(`#${this.containerId}`);
        this.coords = coords || adresses; // массив объектов с координатами и данными
        this.url = url || URL; // адрес апи, по 
        this.center = center || [55.751574, 37.573856];
        this.zoom = zoom || 9;
        this.newObserver = null;
        this.ymapsApiScript = null;
        this.myMap = null;
        this.placemarks = [];
        this.find = find || false;
        this.marksClickHandler = this.marksClickHandler.bind(this);
        this.intObserver(this.container);

    }

    intObserver(target) { // проверяем, что контейнер находится в экране
        this.newObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.findMarks(); // запускаем скрипт слушающий клики по адресам
                    this.appendScript(this.url); // прикрепляем в контейнер скрипт апи яндекса
                    observer.unobserve(entry.target);
                    // console.log('hey');
                }
            });
        });
        this.newObserver.observe(target);
    }

    appendScript(url) { // скрипт прикрепления апи яндекса внутрь контейнера
        if (this.ymapsApiScript) return;
        this.ymapsApiScript = document.createElement('script');
        this.ymapsApiScript.src = url;
        this.container.append(this.ymapsApiScript);
        this.ymapsApiScript.onload = () => this.mapInit(this.coords);
    }

    mapInit(geoPoints) {
        if (geoPoints.length === 1) this.center = geoPoints[0].coords;
        const init = () => {
            this.myMap = new ymaps.Map(this.containerId, {
                center: this.center,
                zoom: this.zoom
            });

            const clusterer = new ymaps.Clusterer({
                // Зададим массив, описывающий иконки кластеров разного размера.
                clusterIcons: [{
                    href: '/templates/demomarket/img/icon/logo1.png',
                    size: [40, 40],
                    offset: [-20, -20]
                }],
                clusterNumbers: [10],
                clusterIconContentLayout: null
            });

            const geoObjects = geoPoints.map((item) => {

                const placemark = new ymaps.Placemark(item.coords, this.getPointData(item));
                this.placemarks[item.id] = placemark;
                return placemark;
            })
            clusterer.add(geoObjects);
            this.myMap.geoObjects.add(clusterer);
        };
        ymaps.ready(init);
    }

    getPointData(item) {
        // разметка балуна точки
        const now = new Date();
        let nowHours = now.getHours();
        let statusOpen;
        statusOpen = nowHours >= item.start && item.end > nowHours ? 'open' : 'close';
        return {
            balloonContentBody: `
            <div class="ymap">
                <p class="ymap__title">Live Beer супермаркет пива</p>
                <div class="map-list__title">
                    <span class="map-list__icon map-list__icon--${item.metro}"></span>
                    <div class="map-list__address">${item.adress}</div>
                </div>
                <a class="ymap__phone" href="tel:${item.phone}">${item.phone}</a>
                <span class="store-card__schedule">${item.start}:00 - ${
                item.end
            }:00</span>
                <span class="map-list__status map-list__status--${statusOpen}">
                    ${statusOpen === 'open' ? 'Открыто' : 'Закрыто'}
                </span>
                <a class="ymap__link" href="${item.link}">Перейти к магазину</a>
            </div>`,
            clusterCaption: 'метка <strong>' + item.id + '</strong>'
        };
    }

    findMarks() { // слушаем клики по блокам с физической разметкой
        if (!this.find) return;
        const items = this.container.parentElement.querySelectorAll('[data-item-id]');
        [...items].forEach((item) => {
            item.addEventListener('click', this.marksClickHandler)
        })
    }

    marksClickHandler(evt) {
        const target = evt.target.closest('[data-item-id]').dataset.itemId;
        const plMark = this.placemarks[target];
        if (!plMark.balloon.isOpen()) {
            plMark.balloon.open();
        } else {
            plMark.balloon.close();
        }
        return false;
    }
}