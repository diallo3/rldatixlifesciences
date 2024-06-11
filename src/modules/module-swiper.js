import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
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

export { initializeExcellentSwiper };


