import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import 'swiper/css/bundle';

let clientSwiper = null;

const initializeClientSwiper = () => {
    clientSwiper = new Swiper('.logos-swiper', {
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

    return clientSwiper;
}

const destroyClientSwiper = () => {
    if (clientSwiper !== null) {
        clientSwiper.destroy(true, true);
        clientSwiper = null;
    }
}

export { initializeClientSwiper, destroyClientSwiper };