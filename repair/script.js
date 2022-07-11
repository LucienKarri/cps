let sliderContainer = document.querySelector('.swiper-container');
let expandButton = document.querySelector('.expand-button');
let cardsList = document.querySelectorAll('.swiper-slide');
let mySwiper;

function mobileSlider() {
    if (window.innerWidth < 768 && sliderContainer.dataset.mobile == 'false') {
        mySwiper = new Swiper(sliderContainer, {
            width: 240,
            spaceBetween: 16,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        sliderContainer.dataset.mobile = 'true';
    }
    if (window.innerWidth >= 768) {
        sliderContainer.dataset.mobile = 'false';
        if (sliderContainer.classList.contains('swiper-initialized')) {
            mySwiper.destroy();
        }
    }
}

function showSlides() {
    let i = cardsList.length;
    while (i != 0) {
        cardsList[--i].classList.remove('swiper-slide--disabled');
    }
}

function hideSlides() {
    if (!expandButton.classList.contains('expand-button--open')) {
        let i = cardsList.length;
        showSlides();
        if (window.innerWidth >= 768 && window.innerWidth < 1120) {
            while (i != 6) {
                cardsList[--i].classList.add('swiper-slide--disabled');
            }
        }
        if (window.innerWidth >= 1120) {
            while (i != 8) {
                cardsList[--i].classList.add('swiper-slide--disabled');
            }
        }
    }
}

function showButton() {
    if (window.innerWidth < 768) {
        expandButton.classList.add('expand-button--disabled');
    } else {
        expandButton.classList.remove('expand-button--disabled');
    }
}

expandButton.addEventListener('click', function () {
    if (!expandButton.classList.contains('expand-button--open')) {
        showSlides();
        expandButton.classList.add('expand-button--open');
        expandButton.textContent = 'Скрыть';
    } else {
        expandButton.classList.remove('expand-button--open');
        expandButton.textContent = 'Показать все';
        hideSlides();
    }
});

mobileSlider();
showButton();
hideSlides();

window.addEventListener('resize', function() {
    mobileSlider();
    showButton();
    hideSlides();
});