const section2Header = document.querySelectorAll(".section2-card-header");
const section2HeaderHeight = section2Header[0].offsetHeight;
const section2CardContainer = document.querySelectorAll(".section2-card-container");

const setSection2CardContainerSticky = () => {
    section2CardContainer.forEach((container, index) => {
        container.style.top = `${section2HeaderHeight * 2.2}px`;
    });
}

const initResize = () => {
    console.log("initResize");
    console.log(section2HeaderHeight);
    // setSection2CardContainerSticky();
}

// Initialize all animations when the document is ready
document.addEventListener('DOMContentLoaded', initResize);