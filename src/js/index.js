import '../scss/style.scss';
import Swiper, { Navigation, Pagination } from '../../node_modules/swiper'
const swiper = document.querySelectorAll('.swiper');
const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
const button = document.querySelectorAll('.expand-button');
const burger = document.querySelectorAll('#burger');
const sideMenu = document.querySelector('.side-menu');
const sideMenuContainer = sideMenu.querySelector('.side-menu__container');
const burgerExit = sideMenu.querySelector('#burger');
const menuDisabled = document.querySelectorAll('.menu__item--disabled');
const telButtons = document.querySelectorAll('#callback');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const modalForm = modal.querySelectorAll('.form__elem');
const modalExit = modal.querySelector('.menu__link');
const chatButtons = document.querySelectorAll('#feedback');
const text = document.querySelector('.about-company__text');
let modalTitle = modal.querySelector('.modal__text');
let slidesList = [];
let mySwiper = [];

/*Функция, которая отвечает за переключение формы, в зависимости от запроса*/
function switchModal() {
    /*Проверяем, какая кнопка была нажата и отключаем/включаем необходимые поля для ввода. Таймауты для достижения плавности (display:none не работает с transition)*/
    if (modal.classList.contains('modal--callback')) {
        modalForm.forEach(element => {
            if ((element.tagName === 'INPUT' && (element.getAttribute('type') === 'text' || element.getAttribute('type') === 'email')) || element.tagName === 'TEXTAREA') {
                element.style.display = 'none';
            }
        });
        modalTitle.textContent = 'Заказать звонок';
    } else {
        modalForm.forEach(element => {
            setTimeout(function() {element.style.display = 'inline-block';}, 100);
        });
        setTimeout(function() {modalTitle.textContent = 'Обратная связь';}, 100);
    }
}

/*Заполняем листы слайдами. Каждому элементу массива - набор слайдов из одного свайпера*/
swiperWrapper.forEach(element => {
    slidesList.push(element.querySelectorAll('.swiper-slide'));
});

/*В зависимости от разрешения экрана решаем, инициализировать слайдер или нет. По тому же принципу - разрушаем его*/
function mobileSwiper(swiper, btn, swiperWrapper) {
    if (window.innerWidth < 768 && swiper.dataset.mobile == 'false') {
        /*для конкретного свайпера, свайпера с ценами, создаем свайпер с другой шириной слайдера*/
        if (swiper.dataset.num == 2) {
            mySwiper[swiper.dataset.num] = new Swiper(swiper, {
                modules: [Navigation, Pagination],
                width: 260,
                spaceBetween: 16,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        } else {
            mySwiper[swiper.dataset.num] = new Swiper(swiper, {
                modules: [Navigation, Pagination],
                width: 240,
                spaceBetween: 16,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }
        swiper.dataset.mobile = 'true';
    } else {
        swiper.dataset.mobile = 'false';
        if (swiper.classList.contains('swiper-initialized')) {
            mySwiper[swiper.dataset.num].destroy();
            let i = 0;
            let j = 1;
            while (i < 2 && j < 3) {
                if (btn[j++].classList.contains('expand-button--open')) {
                    swiperWrapper[i++].style.transition = "none";
                }
            }
        }
    }
}

/*в зависимости от разрешения экрана решаем: отображать или нет раскрывающие кнопки*/
function showHideButton(btn) {
    for (let i = 1; i < btn.length; i++) {
        btn[i].classList.toggle('expand-button--disabled', window.innerWidth < 768)
    }
}

/*Определяем дельту изменения высоты по нажатию на кнопку. Функция принимает конкретный набор слайдов и кнопку, которая соответствует этому набору*/
function heightControl(swiperWrapper,btn) {
    if (btn.classList.contains('expand-button--open')) {
        swiperWrapper.style.maxHeight = swiperWrapper.scrollHeight + 'px';
    } else {
        swiperWrapper.style.maxHeight = 164 + 'px';
    }
}

/*Определяем дельту изменения высоты по нажатию на кнопку(для текста). Функция принимает конкретную кнопку, которая отвечает за раскрытие текста*/
function showText(btn) {
    if (btn.classList.contains('expand-button--open')) {
        text.style.maxHeight = text.scrollHeight + 'px';
    } else {
        if (window.innerWidth < 768) {
            text.style.maxHeight = 90 + 'px';
        }
        if (window.innerWidth >= 768 && window.innerWidth < 1440) {
            text.style.maxHeight = 160 + 'px';
        }
        if (window.innerWidth >= 1440) {
            text.style.maxHeight = 237 + 'px';
        }
    }
}

/*В зависимости от разрешения экрана определяем какие элементы верхнего меню отображать*/
function linkControl() {
    if (window.innerWidth >= 768 && window.innerWidth < 1440) {
        menuDisabled.forEach(element => {
            if (element.classList.contains('menu__item--disabled')) {
                element.classList.toggle('menu__item--disabled');
            }
        });
    } else {
        menuDisabled.forEach(element => {
            if (!element.classList.contains('menu__item--disabled')) {
                element.classList.toggle('menu__item--disabled');
            }
        });
    }
}

/*Первоначальная инициализация свайперов*/
function swiperInit() {
    for (let i = 0; i < 3; i++) {
        mobileSwiper(swiper[i], button, swiperWrapper);
    }
}

/*проверяем корректное значение высоты для каждого раскрывающегося списка*/
function slidesControl() {
    let i = 0;
    let j = 1;
    while (i < 2) {
        heightControl(swiperWrapper[i++], button[j++]);
    }
}

/*добавляем обработчик события  на каждую раскрывающую кнопку*/
function expandButtonListener() {
    for (let i = 0; i < 3; i++) {
        button[i].addEventListener('click', function () {
            let j;
            if (button[i].dataset.num == 2) {
                j = 0;
            } else {
                j = 1;
            }
            /*Если кнопка неактивна, в состоянии "показать все", добавляем активный класс -> в зависимости от принадлежности кнопки определяем функцию контроля высоты. Проделываем в обратном порядке, если состояние кнопки "свернуть"*/
            if (!button[i].classList.contains('expand-button--open')) {
                button[i].classList.toggle('expand-button--open');
                if (i != 0) {
                    heightControl(swiperWrapper[j], button[i]);
                } else {
                    showText(button[i]);
                }
                button[i].textContent = 'Скрыть';
            } else {
                button[i].classList.toggle('expand-button--open');
                if (i != 0) {
                    heightControl(swiperWrapper[j], button[i]);
                    button[i].textContent = 'Показать все';
                } else {
                    showText(button[i]);
                    button[i].textContent = 'Читать далее';
                }
            }
        });
    }
}

/*В зависимости от разрешения, определяем отображать или скрыть кнопку закрытия бокового меню*/
function checkBurgerExit() {
    if (window.innerWidth >= 1440) {
        burgerExit.classList.add('menu__link--disabled')
    } else {
        burgerExit.classList.remove('menu__link--disabled')
    }
}

function clickOutside(e) {
    if (modal.classList.contains('modal--active') && e.clientX < window.innerWidth - getComputedStyle(modalContainer).width.substring(0, getComputedStyle(modalContainer).width.indexOf('px'))) {
        modalExit.click();
        document.removeEventListener('click', clickOutside);
    } else if (sideMenu.classList.contains('side-menu--active') && e.clientX > getComputedStyle(sideMenuContainer).width.substring(0, getComputedStyle(sideMenuContainer).width.indexOf('px'))) {
        burgerExit.click();
        document.removeEventListener('click', clickOutside);
    }
}

function initClickOutside() {
    document.addEventListener('click', clickOutside);
}

function buttonsControl(btn) {
    return function (e) {
        e.preventDefault();
        if (btn.id === 'burger') {
            sideMenu.classList.toggle('side-menu--active');
        }
        if (btn.id === 'callback') {
            if (!modal.classList.contains('modal--active')) {
                modal.classList.toggle('modal--active');
            }
            modal.classList.toggle('modal--callback');
            switchModal();
        }
        if (btn.id === 'feedback') {
            if (modal.classList.contains('modal--active')) {
                modal.classList.toggle('modal--callback');
                switchModal();
            } else {
                modal.classList.toggle('modal--active');
            }
        }
        if (btn === modalExit) {
            if (modal.classList.contains('modal--callback')) {
                modal.classList.toggle('modal--callback');
                switchModal();
            }
            modal.classList.toggle('modal--active');
        }
        if (sideMenu.classList.contains('side-menu--active') || modal.classList.contains('modal--active')) {
            setTimeout(initClickOutside, 1000);
        }
    }
}

burger.forEach(element => {
    element.addEventListener('click', buttonsControl(element));
});

chatButtons.forEach(element => {
    element.addEventListener('click', buttonsControl(element));
});

telButtons.forEach(element => {
    element.addEventListener('click', buttonsControl(element));
});

modalExit.addEventListener('click', buttonsControl(modalExit));

/*обработчик события для закрытия окон через escape*/
document.addEventListener('keydown', function (e) {
    if (e.code == 'Escape') {
        if (modal.classList.contains('modal--active')) {
            modalExit.click();
        } else if (sideMenu.classList.contains('side-menu--active')) {
            burgerExit.click();
        }
    }
});

/*первоначальный вызов функций*/
swiperInit();
linkControl();
showHideButton(button);
slidesControl();
expandButtonListener();
checkBurgerExit();

/*обработчик события ресайза, чтобы подстраиваться под размеры окна*/
window.addEventListener('resize', function() {
    swiperInit();
    showHideButton(button);
    slidesControl();
    if (window.innerWidth >= 1440 && sideMenu.classList.contains('side-menu--active')) {
        burgerExit.click();
    }
    showText(button[0]);
    linkControl();
    checkBurgerExit();
});

