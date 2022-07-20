const swiper = document.querySelectorAll('.swiper');
const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
const button = document.querySelectorAll('.expand-button');
const burger = document.querySelector('.menu__link--burger');
const sideMenu = document.querySelector('.side-menu');
const container = document.querySelector('.container');
const burgerExit = sideMenu.querySelector('.menu__link');
const menuDisabled = document.querySelectorAll('.menu__link--disabled');
const telButtons = document.querySelectorAll('.menu__link--tel');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelectorAll('.form__elem');
const modalExit = modal.querySelector('.menu__link');
const chatButtons = document.querySelectorAll('.menu__link--chat');
let slidesList = [];
let mySwiper = [];
//console.log(modalForm);

function switchModal() {
    if (modal.classList.contains('modal--chat')) {
        modalForm.forEach(element => {
            if ((element.tagName === 'INPUT' && (element.getAttribute('type') === 'text' || element.getAttribute('type') === 'email')) || element.tagName === 'TEXTAREA') {
                element.style.display = 'none';
            }
        });
    } else {
        modalForm.forEach(element => {
            setTimeout(function() {element.style.display = 'inline-block';}, 500);
            
        });
    }
}

chatButtons.forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.toggle('modal--active');
        modal.classList.toggle('modal--chat');
        switchModal();
    })
});

telButtons.forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.toggle('modal--active');
    })
});

modalExit.addEventListener('click', function (e) {
    e.preventDefault();
    if (modal.classList.contains('modal--chat')) {
        modal.classList.toggle('modal--chat');
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
        slidesControl(slidesList[i++], button[j++]);
        heightControl(swiperWrapper[i++], button[j++]);
    }
}

function expandButtonListener() {
    for (let i = 1; i < 3; i++) {
        button[i].addEventListener('click', function () {
            let j;
        if (button[i].dataset.num == 2) {
            j = 0;
        } else {
            j = 1;
        }
        if (!button[i].classList.contains('expand-button--open')) {
            showSlides(slidesList[j]);
            button[i].classList.toggle('expand-button--open');
            heightControl(swiperWrapper[j], button[i]);
            button[i].textContent = 'Скрыть';
            setTimeout(function() {swiperWrapper[j].style.transition = "none";}, 1000);
        } else {
            swiperWrapper[j].style.transition = "max-height 1s";
            button[i].classList.toggle('expand-button--open');
            heightControl(swiperWrapper[j], button[i]);
            button[i].textContent = 'Показать все';
            setTimeout(slidesControl, 1000, slidesList[j], button[i]);
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
    linkControl();
    checkBurgerExit();
});
