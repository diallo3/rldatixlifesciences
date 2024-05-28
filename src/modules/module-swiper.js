import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import 'swiper/css/bundle';

const initializeClientSwiper = () => {
    const swiper = new Swiper('.logos-swiper', {
        modules: [Autoplay],
        // Optional parameters
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        centeredSlides: true,
        slidesPerView: 5,
        spaceBetween: 50,
      });
}

export { initializeClientSwiper };