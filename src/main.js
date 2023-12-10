// Vite Stuff
// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
	import.meta.hot.accept(() => {
		console.log('HMR');
	});
}

// import JS files if applicable
import '../src/modules/module-alpine.js';

// import SCSS files if applicable
import '../src/app.css';

// glob import all css or scss files
import.meta.glob('../templates/**/*.css', { eager: true });

// component imports
import Menu from '../templates/components/menu/menu';

const menu = document.querySelector('nav.menu');
if (menu) {
	console.log(menu);
	new Menu(menu);
}