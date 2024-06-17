// Vite Stuff
// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
	import.meta.hot.accept(() => {
		console.log('HMR');
	});
}

// import JS files if applicable
import { initializeAlpine } from './modules/js/module-alpine';
import { initializeHeadroom } from './modules/js/module-headroom';
import { initializeExcellentSwiper, initializeTestimonialSwiper } from './modules/js/module-swiper';
import { navHeader, generalInView, brandsInView, ctaInView, dividerInView } from './modules/js/module-motionOne';

import { initializeStackedCards } from './modules/js/module-codyhouse';

// import SCSS files if applicable
import '../src/app.css';

// glob import all css or scss files
// import.meta.glob('../templates/**/*.css', { eager: true });

// component imports
document.addEventListener('DOMContentLoaded', () => {
    // component initialization
    navHeader();
    generalInView();
    initializeAlpine();
    initializeHeadroom(); 
    brandsInView();
    ctaInView();
    initializeStackedCards();
    dividerInView();
    initializeExcellentSwiper();
    initializeTestimonialSwiper();


    
});
