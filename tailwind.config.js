/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { values } = require('tailwindcss-fluid-type/src/config/defaults');

module.exports = {
    darkMode: 'class',
    content: [
        './*.php',
        './templates/**/*.twig', 
        './src/**/*.js'
    ],
    theme: {
        fontFamily: {
            sans: [" 'Manrope', 'sans-serif' ", ...defaultTheme.fontFamily.sans],
            serif: [" 'Montserrat', 'sans-serif' ", ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                'wood-smoke': {
                    '50': '#f1f1fe',
                    '100': '#e3e3fb',
                    '200': '#c0c3f7',
                    '300': '#8890f1',
                    '400': '#4857e8',
                    '500': '#2131d6',
                    '600': '#131db6',
                    '700': '#101694',
                    '800': '#0C152D',
                    '900': '#090F21',
                    '950': '#02020a',
                },
                'black-rock': {
                    '50': '#e7f2ff',
                    '100': '#d3e6ff',
                    '200': '#b1d1ff',
                    '300': '#82afff',
                    '400': '#507eff',
                    '500': '#294fff',
                    '600': '#051aff',
                    '700': '#0016ff',
                    '800': '#0113d2',
                    '900': '#0c1ca3',
                    '950': '#040833',
                },
                'flamingo': {
                    '50': '#fff4ed',
                    '100': '#fee6d6',
                    '200': '#fcc9ac',
                    '300': '#faa477',
                    '400': '#f77340',
                    '500': '#f4511e',
                    '600': '#e53611',
                    '700': '#be2510',
                    '800': '#972015',
                    '900': '#7a1d14',
                    '950': '#420b08',
                },
                'dodger-blue': {
                    '50': '#eefaff',
                    '100': '#daf3ff',
                    '200': '#bdebff',
                    '300': '#8fe0ff',
                    '400': '#5acbff',
                    '500': '#34b0fd',
                    '600': '#2b99f3',
                    '700': '#167bdf',
                    '800': '#1962b4',
                    '900': '#1a538e',
                    '950': '#153356',
                },
                'jade': {
                    '50': '#eafff3',
                    '100': '#cdfee1',
                    '200': '#a0fac9',
                    '300': '#63f2ad',
                    '400': '#25e28d',
                    '500': '#00b66a',
                    '600': '#00a460',
                    '700': '#008351',
                    '800': '#006741',
                    '900': '#005537',
                    '950': '#003020',
                }, 
                
            },
            typography: {
                'no-quotes': {
                  css: {
                    'blockquote p:first-of-type::before': { content: 'none' },
                    'blockquote p:last-of-type::after': { content: 'none' },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'), 
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
        require("tailwindcss-fluid-type")({
            settings: {
                prefix: "fluid-",
              },
        }),
        plugin(function ({ addUtilities }) {
            const utilFormSwitch = {
                ".form-switch": {
                    border: "transparent",
                    "background-color": colors.gray[300],
                    "background-image": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")",
                    "background-position": "left center",
                    "background-repeat": "no-repeat",
                    "background-size": "contain !important",
                    "vertical-align": "top",
                    "&:checked": {
                        border: "transparent",
                        "background-color": "currentColor",
                        "background-image":
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")",
                        "background-position": "right center",
                    },
                    "&:disabled, &:disabled + label": {
                        opacity: ".5",
                        cursor: "not-allowed",
                    },
                },
            };
            addUtilities(utilFormSwitch);
        }),
    ],
}

