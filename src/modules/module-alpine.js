import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';



    Alpine.plugin(
        [
            persist, 
            focus, 
            collapse
        ]
    );

export function initializeAlpine() {
    // Alpine.js
    if(!window.Alpine) {
        window.Alpine = Alpine;
        Alpine.start();
    }
    
}