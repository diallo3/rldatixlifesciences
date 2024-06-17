import { animate, scroll, inView, stagger, timeline } from 'motion';

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
        { opacity: ['0', '1'], y: ['0.5rem', '0']}, 
        { delay: stagger(0.35), duration: 0.5, easing: [0.17, 0.55, 0.55, 1] }
    );
}

const brandsInView = () => {

    const brandHeader = document.querySelector('.section-brands__entry');
    

    inView(brandHeader, ({ target }) => {
        const items = target.querySelectorAll('.section-brands__item');

        const brandsSequence = [
            [items, { opacity: ['0', '1'], transform: ['scale(0)',  'scale(1)']}, { delay: stagger(0.25), duration: 0.5, easing: [0.17, 0.55, 0.55, 1] }]
        ]

        timeline(brandsSequence);
    });

}

const keyListInview = () => {
    const target = document.querySelector('.feature-with-key-list__content');
    const listContainer = document.querySelector('.feature-with-key-list__items');
    const listItems = listContainer.querySelectorAll('.feature-with-key-list__item');
    const listCTA = target.querySelector('.feature-with-key-list__cta');

    target.style.height = `${ target.clientWidth }px`;

    const keyListSequence = [
        [ listContainer, { 
            transform: ["none", `translateX(-${ target.scrollWidth }px)`] 
        },
        { 
            duration: 5, easing: [0.17, 0.55, 0.55, 1],
        }],
        [listCTA, { y: ['0rem', '-20rem']}, { at: "-0.15" }]
    ]

    scroll(
        timeline(keyListSequence, {
            duration: 5,
            easing: [0.17, 0.55, 0.55, 1]
        }),
        { 
            target: target,
         }
         
    );
}

const generalInView = () => {
    const sections = document.querySelectorAll('.inview-container');

    inView(sections, ({ target }) => {

        const sectionItems = target.querySelectorAll('.inview-item');

        const sectionSequence = [
            [target, { opacity: ['0', '1'], y: ['1.5rem', '0'] }, { delay: 0.3, duration: 0.5, amount: 0.5, easing: [0.17, 0.55, 0.55, 1] }],
            [sectionItems, { opacity: ['0', '1'], y: ['1.5rem', '0'] }, { delay: stagger(0.1), duration: 0.5, easing: [0.17, 0.55, 0.55, 1] }]
        ]
        

        timeline(sectionSequence);
    });
}

const ctaInView = () => {
    const cta = document.querySelector('.section-cta');

    inView(cta, ({ target }) => {
        const ctaItems = target.querySelectorAll('.section-cta__item');

        const ctaSequence = [
            [target, { opacity: ['0', '1'], transform: ['scale(0.5)', 'scale(1)']}, { delay: 0.3, duration: 0.5, amount: 0.5, easing: [0.17, 0.55, 0.55, 1] }],
            [ctaItems, { opacity: ['0', '1'], y: ['5rem', '0'] }, { delay: stagger(0.85), duration: 0.5, easing: [0.17, 0.55, 0.55, 1] }]
        ]

        timeline(ctaSequence);
    });
}

const dividerInView = () => {
    const dividers = document.querySelectorAll('.page-content .page-content__item');


    dividers.forEach( (divider) => {
        const icon = divider.querySelector('.divider-icon');

        const blue = icon.style.color = '#1962b4';
        const red = icon.style.color = '#f4511e';

        const dividerSequence = [
            [icon, { color: [blue, blue, red, red, blue]  }, { duration: 0.1 }]
        ]

        scroll(timeline(dividerSequence),
            {
            target: icon,
            offset: [ "end", "start"],
        });
    });
}

export { navHeader, heroContent,  generalInView, brandsInView, ctaInView, dividerInView, keyListInview };