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
        footer.shadowRoot.querySelector('.footer').classList.add("outer-container-show");
    }
}

/**
 * TOC Click Handlers
 */
function initTOCClickHandlers() {
    Object.values(tocHeaders).forEach((header) => {
        header.addEventListener('click', (event) => {
            const sectionId = event.target.id.replace('toc-', '');
            
            if (sectionId === 'intro') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
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
    // Initial setup
    setHeaderHeight();
    
    // Global context subscription
    globalContext.headerHeight.subscribe(() => {
        const height = globalContext.headerHeight.getState().height;
        setHeaderHeight(height);
    });

    // Scroll event listeners
    window.addEventListener('scroll', debounce(checkFooterInView, 100));

    // Resize event listeners
    window.addEventListener('resize', debounce(handleResize, 100));

    // Load event listeners
    window.addEventListener('load', () => {
        adjustFillerBlockHeight();
        handleResize();
    });

    // Initialize TOC click handlers
    initTOCClickHandlers();
}

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', initScrollHandlers);

// Export functions that might be needed in other files
export {
    setHeaderHeight,
    setHeroContainerHeight,
    checkFooterInView,
    handleResize
};