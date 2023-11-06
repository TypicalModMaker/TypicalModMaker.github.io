var swiper = new Swiper(".swiper-container", {
    autoplay:{
        delay: 1000,
    },
    loop:true,
    slidesPerView: 2,
    spaceBetween:10,
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        640: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
      },
});