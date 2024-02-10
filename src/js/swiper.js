const swiper_search = new Swiper('.swiper.swiper_search', {
    // Optional parameters
    slidesPerView:1,
    direction: 'horizontal',
    spaceBetween: 20,
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});