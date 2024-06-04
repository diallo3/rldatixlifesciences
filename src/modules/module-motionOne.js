import { animate, inView, stagger, timeline } from 'motion';

const navHeader = () => {
    const navHeader = document.querySelector('.site-header__logo');
    const navItems = document.querySelectorAll('.menu-header-nav li');
    const navSections = document.querySelectorAll('.site-header__cta');

    const navSequence = [
        // [navHeader, {opacity: ['0', '1'], y: ['1rem', '0']}, { duration: 0.5  }],
        [navItems, {opacity: ['0', '1'], y: ['-0.85rem', '0']}, { delay: stagger(0.1), duration: 0.5 }],
        [navSections, {opacity: ['0', '1']}, { delay: stagger(0.1), duration: 0.5 }, { at: '-0.85'}]
    ]
    
    timeline(navSequence);
}

const heroContent = () => {
    const heroContentItems = document.querySelectorAll('.hero-content .hero-content__item');

    if( heroContentItems.length === 0) return;
    animate(heroContentItems, 
        { opacity: ['0', '1'], y: ['2rem', '0']}, 
        { delay: stagger(0.35), duration: 0.5, easing: [0.17, 0.55, 0.55, 1] }
    );
}

const brandsInView = () => {

    const brandHeader = document.querySelector('.section-brands');

    inView( brandHeader, ({ target }) => {
        const icoach = target.querySelector('.brand__icoach');
        const porzio = target.querySelector('.brand__porzio');
        const icontracts = target.querySelector('.brand__icontracts');
        const rldatix = target.querySelector('.brand__rldatix');

        const brandsSequence = [
            [icoach, {opacity: ['0', '1'], transform: ['scale(0)', 'scale(1)']}, { duration: 0.7 }],
            [porzio, {opacity: ['0', '1'], transform: ['scale(0)', 'scale(1)']}, { duration: 0.7}],
            [icontracts, {opacity: ['0', '1'], transform: ['scale(0)', 'scale(1)']}, { duration: 0.7}],
            [rldatix, {opacity: ['0', '1'], transform: ['scale(0)', 'scale(1)']}, { duration: 0.85}],
            
        ]

        timeline(brandsSequence);
    });
}

const generalInView = () => {
    const sections = document.querySelectorAll('.inview-container');

    inView(sections, ({ target }) => {

        const sectionItems = target.querySelectorAll('.inview-item');

       
        animate(target, 
            { opacity: ['0', '1'], y: ['5rem', '0'] }, 
            { delay: 0.3, duration: 0.5, amount: 0.5, easing: [0.17, 0.55, 0.55, 1] },
        );

        if( target) {
            animate(sectionItems, 
                { opacity: ['0', '1'], y: ['5rem', '0'] }, 
                { delay: stagger(0.1), duration: 0.25, easing: [0.17, 0.55, 0.55, 1] }
            );
        }
        
    });
}

const ctaInview = () => {
    const cta = document.querySelector('.section-cta');

    inView(cta, ({ target }) => {
        const ctaItems = target.querySelectorAll('.section-cta__item');

        animate(target, 
            { opacity: ['0', '1'], transform: ['scale(0.5)', 'scale(1)']}, 
            { delay: 0.3, duration: 0.5, amount: 0.5, easing: [0.17, 0.55, 0.55, 1] },
        );

        animate(ctaItems, 
            { opacity: ['0', '1'], y: ['5rem', '0'] }, 
            { delay: stagger(0.35), duration: 0.5, easing: [0.17, 0.55, 0.55, 1] }
        );
    });
}

export { navHeader, heroContent,  generalInView, brandsInView, ctaInview};