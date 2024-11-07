import { adjustFillerBlockHeight } from './utils.js';
import globalContext from '../../datas/globalContext.js'
import { elementIsInViewPort, debounce } from '../IntersectionObserver/vi.js';

// DOM Elements
const filler = document.querySelector(".hero-filler");
const heroContainer = document.querySelector(".section1");
const footer = document.querySelector("footer-custom");
const tocHeaders = {
    intro: document.getElementById("toc-intro"),
    services: document.getElementById("toc-services"),
    works: document.getElementById("toc-works"),
    about: document.getElementById("toc-about")
};
const section3 = document.querySelector(".section3");

let section3Top;

/**
 * Header Height Management
 */
function setHeaderHeight() {
    if(window.innerWidth > 319 && window.innerWidth < 768) {
        filler.style.height = '70px';
    } else {
        filler.style.height = '250px';
    }
}

function setHeroContainerHeight() {
    if(window.innerWidth > 319 && window.innerWidth < 768) {
        const calcHeight = `calc(100vh - 70px)`;
        heroContainer.style.height = calcHeight;
    } else {
        const calcHeight = `calc(100vh - 250px)`;
        heroContainer.style.height = calcHeight;
    }
}

/**
 * Footer Visibility Check
 */
function checkFooterInView() {
    if(elementIsInViewPort(footer, 20)) {
        console.log("footer")
        footer.shadowRoot.querySelector('.footer').classList.add("outer-container-show");
    }
}

function scrollDebounceFunction() {
    section3Top = section3.getBoundingClientRect().top;
}   


/**
 * Resize Handlers
 */
function handleResize() {
    setHeaderHeight();
    setHeroContainerHeight();
    adjustFillerBlockHeight();
}

/**
 * Initialize all scroll and resize related functionality
 */
function initScrollHandlers() {

    window.addEventListener('scroll', debounce(scrollDebounceFunction, 100));

}

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', initScrollHandlers);

// Export functions that might be needed in other files
export {
    setHeaderHeight,
    setHeroContainerHeight,
    checkFooterInView,
    handleResize,
    section3Top
};