import { adjustFillerBlockHeight } from './utils.js';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Sequence for TOC animations
const sequence = ['intro', 'services', 'works', 'about'];
let titleArr = [];

// Get DOM elements
const sections = document.querySelectorAll("div[id]");
const tocHeaders = {
    intro: document.getElementById("toc-intro"),
    services: document.getElementById("toc-services"),
    works: document.getElementById("toc-works"),
    about: document.getElementById("toc-about")
};
const stickyToc = document.querySelector(".sticky-toc");
const footer = document.querySelector("footer-custom");

// Animation utility functions
const showElement = (element) => {
    gsap.fromTo(
        element,
        { opacity: 0, height: 0, y: 0 },
        {
            opacity: 1,
            height: element.scrollHeight,
            y: 0,
            duration: 0.6,
            ease: "power1.inOut"
        }
    );
};

const hideElement = (element) => {
    gsap.to(element, {
        opacity: 0,
        height: 0,
        duration: 0.6,
        ease: "power1.inOut",
    });
};

const hideStickyToc = () => {
    gsap.fromTo(
        stickyToc,
        {
            opacity: 1,
            y: 0        
        },
        {
            opacity: 0,
            y: 500,
            duration: 0.6,
            ease: "power1.inOut"
        }
    );
};

const showStickyToc = () => {
    gsap.to(
        stickyToc, {
            opacity: 1,
            y: 0,
        }
    );
};

const highlightText = (element) => {
    gsap.fromTo(
        element,
        {
            color: "#333333",
        },
        {
            color: "#7D715C",
        }
    );
};

const disableHighlightText = (element) => {
    gsap.to(
        element,
        {
            color: "#333333",
        }
    );
};

// Section handlers
function handleEnter(id, tocHeader) {
    if (!titleArr.includes(id)) {
        const position = sequence.indexOf(id);

        if (titleArr.length === 0 && id !== sequence[0]) {
            // Add all elements up to the current one in sequence
            for (let i = 0; i <= position; i++) {
                titleArr.push(sequence[i]);
                showElement(tocHeaders[sequence[i]]);
            }
        } else {
            titleArr.push(id);
            showElement(tocHeader);
        }
    }
}

function handleLeaveBack(id, tocHeader) {
    if (id === titleArr[titleArr.length - 1]) {
        titleArr.pop();
        hideElement(tocHeader);
    }
}

// Initialize animations
const initAnimations = () => {
    // Footer animation
    ScrollTrigger.create({
        trigger: footer,
        start: "top 75%",
        onEnter: () => hideStickyToc(),
        onLeaveBack: () => showStickyToc()
    });

    // Section animations
    sections.forEach((section) => {
        const id = section.id;
        const tocHeader = tocHeaders[id];

        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
                handleEnter(id, tocHeader);
                highlightText(tocHeader);
            },
            onLeaveBack: () => {
                handleLeaveBack(id, tocHeader);
            },
            onLeave: () => {
                disableHighlightText(tocHeader);
            },
            onEnterBack: () => {
                highlightText(tocHeader);
            },
            scrub: true,
        });
    });

    // Hero text animation
    gsap.fromTo(".hero-text",
        {
            opacity: 0,
            x: -100,
            duration: 2
        },
        {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-text",
                start: "top 100%",
                toggleActions: "play none none none"
            }
        }
    );

    // Services section animations
    ScrollTrigger.create({
        trigger: ".services-text",
        start: "top 80%",
        onEnter: () => {
            // Text animation
            gsap.fromTo(".services-text", 
                {
                    opacity: 0,
                    y: 100
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: "power2.out",
                    onComplete: adjustFillerBlockHeight
                }
            );

            // Filler block animation
            gsap.fromTo(".filler-block",
                {
                    opacity: 0,
                    y: 100
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: "power2.out"
                }
            );
        }
    });
};

// Initialize all animations when the document is ready
document.addEventListener('DOMContentLoaded', initAnimations);

// Export functions that might be needed in other files
export {
    showElement,
    hideElement,
    hideStickyToc,
    showStickyToc,
    highlightText,
    disableHighlightText
};