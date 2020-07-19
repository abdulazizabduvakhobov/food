function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    
    // Slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
 
    function getNum(item) {
        return +item.replace(/\D/g, '');
    }

    function opacity(item) {
        item.forEach(dot => dot.style.opacity = '.5');
        item[slideIndex - 1].style.opacity = 1;
    }

    function slidesCounter (id) {
        if (slides.length < 10) {
            id.textContent = `0${slideIndex}`;
        } else {
            id.textContent = slideIndex;
        }
    }

    function slidesTo (parent) {
        parent.forEach( dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = getNum(width) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                slidesCounter(current);

                opacity(dots);
            });
        });
    }
    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }


    function styleSlides (field, wrapper, slider, slides) {
        field.style.width = 100 * slides.length + '%';
        field.style.display = 'flex';
        field.style.transition = '0.5s all';

        wrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;
        });

        slider.style.position = 'relative';
    }

    styleSlides(slidesField, slidesWrapper, slider, slides);

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for ( let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if ( offset == getNum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getNum(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slidesCounter(current);
        
        opacity(dots);
    });

    prev.addEventListener('click', () => {
        if ( offset == 0 ) {
            offset = getNum(width) * (slides.length - 1);
        } else {
            offset -= getNum(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slidesCounter(current);
        
        opacity(dots); 
    });

    slidesTo(dots);
}

export default slider;