import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css/bundle';

const initializeExcellentSwiper = () => {
    let excellenceSwiper = null;

    const init = () => {
        const swiperElement = document.querySelector('.excellence-swiper');
       
        if (swiperElement) {
            excellenceSwiper = new Swiper(swiperElement, {
                modules: [Autoplay],  // Ensure the Autoplay module is included properly
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                loop: true,
                centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 30,
            });
            console.log('Swiper initialized');
        }
    };

    const destroyExcellenceSwiper = () => {
        if (excellenceSwiper) {
            excellenceSwiper.destroy();
            excellenceSwiper = null;
            console.log('Swiper destroyed');
        }
    };

    init();

    return {
        excellenceSwiper,
        destroyExcellenceSwiper
    };


};

const initializeTestimonialSwiper = () => {
    let testimonialSwiper = null;

    const init = () => {
        const swiperElement = document.querySelector('.testimonial-swiper');
       
        if (swiperElement) {
            testimonialSwiper = new Swiper(swiperElement, {
                modules: [Autoplay, Navigation],  // Ensure the Autoplay module is included properly
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.swiper-button__next',
                    prevEl: '.swiper-button__prev',
                },
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
            });
           
        }
    };

    const destroyTestimonialSwiper = () => {
        if (testimonialSwiper) {
            testimonialSwiper.destroy();
            testimonialSwiper = null;
            console.log('Swiper destroyed');
        }
    };

    init();

    return {
        testimonialSwiper,
        destroyTestimonialSwiper
    };


};

export { initializeExcellentSwiper, initializeTestimonialSwiper };


