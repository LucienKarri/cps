const swiper = document.querySelectorAll('.swiper-container');
const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
const button = document.querySelectorAll('.expand-button');
const burger = document.querySelector('.menu__link--burger');
const sideMenu = document.querySelector('.side-menu');
const container = document.querySelector('.container');
const burgerExit = sideMenu.querySelector('.menu__link');
let slidesList = [];
let mySwiper = [];

burger.addEventListener('click', function (e) {
    e.preventDefault();
    sideMenu.classList.toggle('side-menu--active');
    container.style.opacity = 0.5;

});

burgerExit.addEventListener('click', function (e) {
    e.preventDefault();
    sideMenu.classList.toggle('side-menu--active');
    container.style.opacity = 1;
});

swiperWrapper.forEach(element => {
    slidesList.push(element.querySelectorAll('.swiper-slide'));
});

function mobileSwiper(swiper, btn, swiperWrapper) {
    if (window.innerWidth < 768 && swiper.dataset.mobile == 'false') {
        console.log('init');
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
            console.log('des');
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
        list[--i].classList.remove('repair-slide--disabled');
    }
}

function slidesControl(list, btn) {
    let i = list.length;
    if (window.innerWidth < 768 || btn.classList.contains('expand-button--open')) {
        showSlides(list);
    }
    if (!btn.classList.contains('expand-button--open')) {
        if (window.innerWidth >= 768 && window.innerWidth < 1120) {
            if (btn.dataset.num == 3) {
                while (i != 3) {
                    list[--i].classList.add('repair-slide--disabled');
                }
            } else {
                while (i != 6) {
                    list[--i].classList.add('repair-slide--disabled');
                }
            }
        }
        if (window.innerWidth >= 1120) {
            if (btn.dataset.num == 3) {
                while (i != 4) {
                    list[--i].classList.add('repair-slide--disabled');
                }
                while (i != 3) {
                    list[--i].classList.remove('repair-slide--disabled');
                }
            } else {
                while (i != 8) {
                    list[--i].classList.add('repair-slide--disabled');
                }
                while (i != 6) {
                    list[--i].classList.remove('repair-slide--disabled');
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

/* first call */

for (let i = 0; i < 3; i++) {
    mobileSwiper(swiper[i], button, swiperWrapper);
}
showHideButton(button);
let i = 0;
let j = 1;
while (i < 2) {
    slidesControl(slidesList[i++], button[j++]);
}
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

window.addEventListener('resize', function() {
    for (let i = 0; i < 3; i++) {
        mobileSwiper(swiper[i], button, swiperWrapper);
    }
    showHideButton(button);
    let i = 0;
    let j = 1;
    while (i < 2) {
        slidesControl(slidesList[i], button[j]);
        heightControl(swiperWrapper[i++], button[j++]);
    }
    if (window.innerWidth < 1440) {
        container.style.opacity = 1;
    }
});
