export function tabs(mapBtns, mapItems, dataset, classNameBtn, classNameItem) {
    mapBtns.forEach(item => {
        item.addEventListener('click', () => {
            let currentBtn = item;
            let tabId = currentBtn.getAttribute(dataset);
            let currentTab = document.querySelector(tabId);

            if (!currentBtn.classList.contains(`${classNameBtn}--active`)) {
                mapBtns.forEach(item => {
                    item.classList.remove(`${classNameBtn}--active`);
                });

                mapItems.forEach(item => {
                    item.classList.remove(`${classNameItem}--active`);
                });
                currentBtn.classList.add(`${classNameBtn}--active`);
                currentTab.classList.add(`${classNameItem}--active`);
            }
        });
    });
}