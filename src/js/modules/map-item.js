export function mapList([...listItems]) {
    listItems.forEach(listItem => {
        const metroName = listItem.querySelector('.metro-name-js');
        const now = new Date();
        let nowHours = now.getHours();
        const datasetList = listItem.dataset;
        const mapStatus = listItem.querySelectorAll('.map-list__works');
        const listStatus = listItem.querySelector('.map-list__status');
        const metroIcons = listItem.querySelectorAll('.map-list__icon');
        const mapAddress = listItem.querySelectorAll('.map-list__address-js');
        const mapTime = listItem.querySelector('.store-card__schedule-js');
        const mapPhone = listItem.querySelector('.store-card__number');

        // адрес магазина
        mapAddress.forEach(address => {
            address.innerHTML = `${datasetList.itemAdress}`;
        })
        // проверяем время работы и присваем соответствующий статус работет || закрыто
        mapStatus.forEach(status => {
            if (
                nowHours >= datasetList.itemStart &&
                datasetList.itemEnd > nowHours
            ) {
                status.innerHTML = `Закроется в ${datasetList.itemEnd}:00`;
                listStatus.innerHTML = `Открыто`;
                listStatus.classList.add('map-list__status--open');
            } else {
                status.innerHTML = `Откроется в ${datasetList.itemStart}:00`;
                listStatus.innerHTML = `Закрыто`;
                listStatus.classList.add('map-list__status--close');
            }
        });
        // красим иконки метро
        metroIcons.forEach(metroIcon => {
            switch (datasetList.itemMetro) {
                case 'green':
                    metroIcon.classList.add('map-list__icon--green');
                    break;
                case 'blue':
                    metroIcon.classList.add('map-list__icon--blue');
                    break;
                case 'red':
                    metroIcon.classList.add('map-list__icon--red');
                    break;
                case 'orange':
                    metroIcon.classList.add('map-list__icon--orange');
                    break;
                case 'purple':
                    metroIcon.classList.add('map-list__icon--purple');
                    break;
                default:
                    metroIcon.classList.add('map-list__icon--white');
                }
                
            });
            
        // название станции метро для старницы магазина
        if (metroName) {
            metroName.innerHTML = `${datasetList.itemMetroName}`;
        }
        // время работы для страницы магазина
        if (mapTime) {
            mapTime.innerHTML =
            `${datasetList.itemStart}:00 - ${datasetList.itemEnd}:00
            ${datasetList.itemWeekend !== '' ? datasetList.itemWeekend + ' - выходной' : ''}`;
        }
        // номер телефона для страницы маназина
        if (mapPhone) {
            mapPhone.innerHTML = `${datasetList.itemPhone}`
        }

    });
}