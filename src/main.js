// Vite Stuff
// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
	import.meta.hot.accept(() => {
		console.log('HMR');
	});
}

// import JS files if applicable
import { initializeAlpine } from './modules/module-alpine';

// import SCSS files if applicable
import '../src/app.css';

// glob import all css or scss files
import.meta.glob('../templates/**/*.css', { eager: true });

// component imports

document.addEventListener('DOMContentLoaded', () => {
    // component initialization
    initializeAlpine();
});
