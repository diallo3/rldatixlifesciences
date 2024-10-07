import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';
import ajax from '@imacrayon/alpine-ajax';
import moduleAlpineNavHighlighter from '/src/modules/js/module-alpine-navHighlighter.js';

Alpine.plugin(
        [
            persist, 
            focus, 
            collapse,
            ajax,
        ]
);
   

export function initializeAlpine() {
    // Alpine.js
    if(!window.Alpine) {
        Alpine.data('visibleNavHighlighter', moduleAlpineNavHighlighter);

        Alpine.data('search', () => ({
            query: '',
            results: [],
            console: console.log('search'),
            init() {
                this.console;
                this.$watch('query', value => {
                    if(value.length > 2 ) {
                        this.performSearch(value);
                    };
                })
            },

            performSearch() {
                if (this.query.length > 2) { // Only search for queries with more than 2 characters
                    fetch(`/?rest_route=/wp/v2/posts&search=${encodeURIComponent(this.query)}`)
                        .then(response => response.json())
                        .then(data => {
                            this.results = data; // Populate the results array with fetched data

                            console.log('Search results:', this.results);
                        })
                        .catch(error => {
                            console.error('Error fetching search results:', error);
                        })
                        .finally(() => {
                            console.log('Search complete!');
                        });
                    } else {
                        this.results = [];
                    }
            }   
        }));
        
        window.Alpine = Alpine;
        Alpine.start();
    }
    
}