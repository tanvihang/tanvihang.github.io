import { tokensColors } from '../../constants/colors.js';
import { adjustFillerBlockHeight } from './utils.js';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Sequence for TOC animations
const sequence = ['intro', 'services', 'works', 'about'];
let titleArr = [];

// Get DOM elements
const sections = document.querySelectorAll("div[id]")
const tocHeaders = {
    intro: document.getElementById("toc-intro"),
    services: document.getElementById("toc-services"),
    works: document.getElementById("toc-works"),
    about: document.getElementById("toc-about")
};
const tocAngus = document.getElementById("toc-angus");

const stickyToc = document.querySelector(".sticky-toc");
const footer = document.querySelector("footer-custom");

const section2 = document.querySelector(".section2");
const servicesCards = document.querySelectorAll(".section2-card-container");


const section3 = document.querySelector(".section3");
const darkSection = document.querySelector(".dark-section");

let isColorChange = false;

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

    if (isColorChange) {
        gsap.to(
            element,
            {
                color: "#FFFFFF",
            }
        );
    } else {
        gsap.to(
            element,
            {
                color: "#333333",
            }
        );
    }
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

const changeToWhite = () => {
    isColorChange = true;
    gsap.to(Object.values(tocHeaders).filter(header =>
        header.style.opacity !== "0" && header.style.color !== "#7D715C"
    ), {
        color: tokensColors.textBodyInvert,
        duration: 0.3
    });
    gsap.to(tocAngus, {
        color: tokensColors.textBodyInvert,
        duration: 0.3
    });
}

const changeToBlack = () => {
    isColorChange = false;
    gsap.to(Object.values(tocHeaders).filter(header =>
        header.style.opacity !== "0" && header.style.color !== "#7D715C"
    ), {
        color: tokensColors.textBody,
        duration: 0.3
    });
    gsap.to(tocAngus, {
        color: tokensColors.textBody,
        duration: 0.3
    });
}

// Section animations
const initSectionAnimations = () => {

    //* TOC Section animations
    sections.forEach((section) => {
        const id = section.id;
        const tocHeader = tocHeaders[id];

        ScrollTrigger.create({
            trigger: section,
            start: "top 90%",
            end: "bottom 90%",
            onEnter: () => {
                handleEnter(id, tocHeader);
                // Add small delay to ensure section3 animation runs first
                gsap.delayedCall(0.01, () => highlightText(tocHeader));
            },
            onLeaveBack: () => {
                handleLeaveBack(id, tocHeader);
            },
            onLeave: () => {
                gsap.delayedCall(0.01, () => disableHighlightText(tocHeader));
            },
            onEnterBack: () => {
                gsap.delayedCall(0.01, () => highlightText(tocHeader));
            },
            scrub: true,
        });
    });

    //* Hero text animation
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

    //* Services section animations
    ScrollTrigger.create({
        trigger: ".services-text",
        start: "top 80%",
        once: true,
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
                    onComplete: adjustFillerBlockHeight,
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
                    ease: "power2.out",
                }
            );


        }
    });

    //* Services cards animations
    servicesCards.forEach((card) => {
        ScrollTrigger.create({
            trigger: card,
            start: "top 100%",
            once: true,
            onEnter: () => {
                gsap.fromTo(card, {
                    opacity: 0,
                    y: 100
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                })

                // Animate li::after
                const listItems = card.querySelectorAll("li");
                listItems.forEach((li) => {
                    li.classList.add("animate"); // Add class to trigger CSS animation
                });
            }


        })
    })


};

// Initialize animations
const initAnimations = () => {
    // Footer animation
    ScrollTrigger.create({
        trigger: footer,
        start: "top 75%",
        onEnter: () => hideStickyToc(),
        onLeaveBack: () => showStickyToc()
    });

    // Section3 color change animation
    ScrollTrigger.create({
        trigger: darkSection,
        start: "top 90%",
        end: "bottom 90%",
        onEnter: () => {
            changeToWhite();
        },
        onLeave: () => {
            changeToBlack();
        },
        onEnterBack: () => {
            changeToWhite();
        },
        onLeaveBack: () => {
            changeToBlack();
        }
    });

    // Initialize section animations after section3 setup
    initSectionAnimations();


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