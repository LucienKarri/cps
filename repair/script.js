const sliderContainer = document.querySelector('.swiper-container');
const expandButton = document.querySelector('.expand-button');
const cardsList = document.querySelectorAll('.swiper-slide');
const sliderWrapper = sliderContainer.querySelector('.swiper-wrapper');
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
            if (expandButton.classList.contains('expand-button--open')) {
                sliderWrapper.style.transition = "none";
            }
        }
    }
}
function showSlides() {
    let i = cardsList.length;
    while (i != 0) {
        cardsList[--i].classList.remove('swiper-slide--disabled');
    }
}

function slidesCondition() {
    let i = cardsList.length;
    if (window.innerWidth < 768 || expandButton.classList.contains('expand-button--open')) {
        showSlides();
    }
    if (!expandButton.classList.contains('expand-button--open')) {
        if (window.innerWidth >= 768 && window.innerWidth < 1120) {
            while (i != 6) {
                cardsList[--i].classList.add('swiper-slide--disabled');
            }
        }
        if (window.innerWidth >= 1120) {
            while (i != 8) {
                cardsList[--i].classList.add('swiper-slide--disabled');
            }
            while (i != 6) {
                cardsList[--i].classList.remove('swiper-slide--disabled');
            }
        }
    }
}

function showButton() {
    expandButton.classList.toggle('expand-button--disabled', window.innerWidth < 768);
}
function heightControl() {
    if (expandButton.classList.contains('expand-button--open')) {
        sliderWrapper.style.maxHeight = sliderWrapper.scrollHeight + 'px';
    } else {
        sliderWrapper.style.maxHeight = 164 + 'px';
    }
}

expandButton.addEventListener('click', function () {
    if (!expandButton.classList.contains('expand-button--open')) {
        showSlides();
        expandButton.classList.toggle('expand-button--open');
        heightControl();
        expandButton.textContent = 'Скрыть';
        setTimeout(function() {sliderWrapper.style.transition = "none";}, 1000);
    } else {
        sliderWrapper.style.transition = "max-height 1s";
        expandButton.classList.toggle('expand-button--open');
        heightControl();
        expandButton.textContent = 'Показать все';
        setTimeout(slidesCondition, 1000);
    }
});

mobileSlider();
showButton();
slidesCondition();

window.addEventListener('resize', function() {
    mobileSlider();
    showButton();
    slidesCondition();
    heightControl();
});