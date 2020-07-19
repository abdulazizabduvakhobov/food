require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import slider from './modules/slider';
import cards from './modules/cards';
import forms from './modules/forms';
import {openModal} from './modules/modal';
// import scroll from './modules/scrolling';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2020-07-25');
    calc();
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
    cards();
    forms('form', modalTimerId);

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const blockId = anchor.getAttribute('href');
            document.querySelector(''+ blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});