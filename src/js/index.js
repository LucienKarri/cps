import '../scss/style.scss';
import Swiper, { Navigation, Pagination } from '../../node_modules/swiper'
const swiper = document.querySelectorAll('.swiper');
const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
const button = document.querySelectorAll('.expand-button');
const burger = document.querySelector('.menu__link--burger');
const sideMenu = document.querySelector('.side-menu');
const burgerExit = sideMenu.querySelector('.menu__link');
const menuDisabled = document.querySelectorAll('.menu__link--disabled');
const telButtons = document.querySelectorAll('.menu__link--tel');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelectorAll('.form__elem');
const modalExit = modal.querySelector('.menu__link');
const chatButtons = document.querySelectorAll('.menu__link--chat');
const text = document.querySelector('.about-company__text');
let modalTitle = modal.querySelector('.modal__title');
let slidesList = [];
let mySwiper = [];

function switchModal() {
    if (modal.classList.contains('modal--callback')) {
        modalForm.forEach(element => {
            if ((element.tagName === 'INPUT' && (element.getAttribute('type') === 'text' || element.getAttribute('type') === 'email')) || element.tagName === 'TEXTAREA') {
                element.style.display = 'none';
            }
        });
        modalTitle.textContent = 'Заказать звонок';
    } else {
        modalForm.forEach(element => {
            setTimeout(function() {element.style.display = 'inline-block';}, 500);
        });
        setTimeout(function() {modalTitle.textContent = 'Обратная связь';}, 500);
    }
}

chatButtons.forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.toggle('modal--active');
    })
});

telButtons.forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.toggle('modal--active');
        modal.classList.toggle('modal--callback');
        switchModal();
    })
});

modalExit.addEventListener('click', function (e) {
    e.preventDefault();
    if (modal.classList.contains('modal--callback')) {
        modal.classList.toggle('modal--callback');
        switchModal();
    }
    modal.classList.toggle('modal--active');
});

swiperWrapper.forEach(element => {
    slidesList.push(element.querySelectorAll('.swiper-slide'));
});

function mobileSwiper(swiper, btn, swiperWrapper) {
    if (window.innerWidth < 768 && swiper.dataset.mobile == 'false') {
        if (swiper.dataset.num == 2) {
            mySwiper[swiper.dataset.num] = new Swiper(swiper, {
                modules: [Navigation, Pagination],
                width: 260,
                height: 190,
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
    }
    if (window.innerWidth >= 768) {
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

function showHideButton(btn) {
    for (let i = 1; i < btn.length; i++) {
        btn[i].classList.toggle('expand-button--disabled', window.innerWidth < 768)
    }
}

function showSlides(list) {
    let i = list.length;
    while (i != 0) {
        list[--i].classList.remove('swiper-slide--disabled');
    }
}

function slidesControl(list, btn) {
    let i = list.length;
    if (window.innerWidth < 768 || btn.classList.contains('expand-button--open')) {
        showSlides(list);
    }
    if (!btn.classList.contains('expand-button--open')) {
        if (window.innerWidth >= 768 && window.innerWidth < 1440) {
            if (btn.dataset.num == 3) {
                while (i != 3) {
                    list[--i].classList.add('swiper-slide--disabled');
                }
            } else {
                while (i != 6) {
                    list[--i].classList.add('swiper-slide--disabled');
                }
            }
        }
        if (window.innerWidth >= 1440) {
            if (btn.dataset.num == 3) {
                while (i != 4) {
                    list[--i].classList.add('swiper-slide--disabled');
                }
                while (i != 3) {
                    list[--i].classList.remove('swiper-slide--disabled');
                }
            } else {
                while (i != 8) {
                    list[--i].classList.add('swiper-slide--disabled');
                }
                while (i != 6) {
                    list[--i].classList.remove('swiper-slide--disabled');
                }
            }
        }
    }
}

function heightControl(swiperWrapper,btn) {
    if (btn.classList.contains('expand-button--open')) {
        swiperWrapper.style.maxHeight = swiperWrapper.scrollHeight + 'px';
    } else {
        swiperWrapper.style.maxHeight = 164 + 'px';
    }
}

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

function linkControl() {
    if (window.innerWidth >= 768 && window.innerWidth < 1440) {
        menuDisabled.forEach(element => {
            if (element.classList.contains('menu__link--disabled')) {
                element.classList.toggle('menu__link--disabled');
            }
        });
    } else {
        menuDisabled.forEach(element => {
            if (!element.classList.contains('menu__link--disabled')) {
                element.classList.toggle('menu__link--disabled');
            }
        });
    }
}

function swiperInit() {
    for (let i = 0; i < 3; i++) {
        mobileSwiper(swiper[i], button, swiperWrapper);
    }
}

function initSlidesControl() {
    let i = 0;
    let j = 1;
    while (i < 2) {
        slidesControl(slidesList[i], button[j]);
        heightControl(swiperWrapper[i++], button[j++]);
    }
}

function expandButtonListener() {
    for (let i = 0; i < 3; i++) {
        button[i].addEventListener('click', function () {
            let j;
            if (button[i].dataset.num == 2) {
                j = 0;
            } else {
                j = 1;
            }
            if (!button[i].classList.contains('expand-button--open')) {
                button[i].classList.toggle('expand-button--open');
                if (i != 0) {
                    showSlides(slidesList[j]);
                    heightControl(swiperWrapper[j], button[i]);
                    setTimeout(function() {swiperWrapper[j].style.transition = "none";}, 1000);
                } else {
                    showText(button[i]);
                    setTimeout(function() {text.style.transition = "none";}, 1000);
                }
                button[i].textContent = 'Скрыть';
            } else {
                button[i].classList.toggle('expand-button--open');
                if (i != 0) {
                    swiperWrapper[j].style.transition = "max-height 1s";
                    heightControl(swiperWrapper[j], button[i]);
                    setTimeout(slidesControl, 1000, slidesList[j], button[i]);
                    button[i].textContent = 'Показать все';
                } else {
                    text.style.transition = "max-height 1s";
                    showText(button[i]);
                    button[i].textContent = 'Читать далее';
                }
            }
        });
    }
}

function checkBurgerExit() {
    if (window.innerWidth >= 1440) {
        burgerExit.classList.add('menu__link--disabled')
    } else {
        burgerExit.classList.remove('menu__link--disabled')
    }
}

swiperInit();
linkControl();
showHideButton(button);
initSlidesControl();
expandButtonListener();
checkBurgerExit();

burger.addEventListener('click', function (e) {
    e.preventDefault();
    sideMenu.classList.toggle('side-menu--active');
});

burgerExit.addEventListener('click', function (e) {
    e.preventDefault();
    sideMenu.classList.toggle('side-menu--active');
});

document.addEventListener('keydown', function (e) {
    if (e.code == 'Escape') {
        if (modal.classList.contains('modal--active')) {
            modalExit.click();
        } else if (sideMenu.classList.contains('side-menu--active')) {
            burgerExit.click();
        }
    }
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal__container') && modal.classList.contains('modal--active')) {
        modalExit.click();
    } else if (e.target.classList.contains('side-menu__container') && sideMenu.classList.contains('side-menu--active')) {
        burgerExit.click();
    }
});

window.addEventListener('resize', function() {
    swiperInit();
    showHideButton(button);
    initSlidesControl();
    if (window.innerWidth >= 1440 && sideMenu.classList.contains('side-menu--active')) {
        burgerExit.click();
    }
    showText(button[0]);
    linkControl();
    checkBurgerExit();
});

