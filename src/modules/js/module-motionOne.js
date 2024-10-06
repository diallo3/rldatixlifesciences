import { animate, scroll, inView, stagger, timeline } from 'motion';

const navHeader = () => {
    const navHeader = document.querySelector('.site-header__logo');
    const navItems = document.querySelectorAll('.menu-header-nav li');
    const navSections = document.querySelectorAll('.site-header__cta');

    const navSequence = [
        // [navHeader, {opacity: ['0', '1'], y: ['1rem', '0']}, { duration: 0.5  }],
        [navItems, {opacity: ['0', '1'], y: ['-0.5rem', '0']}, { delay: stagger(0.05), duration: 0.2 }],
        [navSections, {opacity: ['0', '1']}, { delay: stagger(0.1), duration: 0.5 }, { at: '-0.85'}]
    ]
    
    // timeline(navSequence);
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

    const brandHeader = document.querySelector('.section-brands');
    const brandAccent = brandHeader.querySelector('.section-brands__accent');
    const brandTitle = brandHeader.querySelector('.section-brands__title');
    const brandGlow = brandHeader.querySelector('.section-brands__glow');
    const brandItems = brandHeader.querySelectorAll('.section-brands__item');

    const brandsSequence = [
        [brandAccent, { opacity: ['0', '1']}, { duration: 1.5, easing: [0.17, 0.55, 0.55, 1] }],
        [brandTitle, 
            { 
                opacity: ['0', '1'], y: ['1.5rem', '0'], 
                transform: ['scale(0.85)', 'scale(1.15)', 'scale(1)']
            },
            { 
                duration: 2.5, 
                easing: [0.17, 0.55, 0.55, 1],
            },
            { at: '+1.1'}
        ],
        [brandGlow, 
            { 
            opacity: ['0', '1']}, 
            { duration: 4, easing: [0.17, 0.55, 0.55, 1] }, 
            { at: '-0.5'}
        ],
        [brandItems, { 
            opacity: ['0', '1'], 
            transform: ['scale(0.5)', 'scale(1.25)', 'scale(1)']
        },
        { 
            delay: stagger(0.85), 
            duration: 2.5, 
            easing: [0.17, 0.55, 0.55, 1]
        },
        { at: '>' }]
    ]

    scroll(
        timeline(brandsSequence),
        { 
            target: brandHeader,
            offset: ["0 0.6", "-30px -30px"],
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
        if( icon ) {
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
        }
        
    });
}

export { navHeader, heroContent,  generalInView, brandsInView, ctaInView, dividerInView };