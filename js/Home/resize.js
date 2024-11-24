import scale from "../../../constants/scale.js";

const section2Header = document.querySelectorAll(".section2-card-header");
const section2HeaderHeight = section2Header[0].offsetHeight;
const section2CardContainer = document.querySelectorAll(".section2-card-container");

const section2CardHeader = document.querySelectorAll(".section2-card-header");

const section2CardContent = document.querySelectorAll(".section2-card-content");

const section2Sticky1 = document.querySelector(".section2-sticky-1");
const section2Sticky2 = document.querySelector(".section2-sticky-2");
// if(isDesktop()) {
    
//     const marginBottom1 = section2CardHeader[0].offsetHeight * 4;
//     const marginBottom2 = section2CardHeader[0].offsetHeight * 2;
//     section2Sticky1.style.marginBottom = `${marginBottom1}px`;
//     section2Sticky2.style.marginBottom = `${marginBottom2}px`;
//   }else{
  
//     const marginBottom1 = section2CardHeader[0].offsetHeight * 3.7;
//     const marginBottom2 = section2CardHeader[0].offsetHeight * 1.85;
//     section2Sticky1.style.marginBottom = `${marginBottom1}px`;
//     section2Sticky2.style.marginBottom = `${marginBottom2}px`;
//   }

const setSection2CardContainerSticky = () => {
    section2CardContainer.forEach((container, index) => {
        container.style.top = `${section2HeaderHeight * 2.2}px`;
    });
}

const hasHover = window.matchMedia('(hover: hover)').matches;

const isDesktop = () => {
    return window.innerWidth > scale.windowWidth.desktop && hasHover;
};

const resizeSection2CardHeader = () => {

    if(isDesktop()){
        section2Sticky1.style.marginBottom = `${section2CardHeader[0].offsetHeight * 4}px`;
        section2Sticky2.style.marginBottom = `${section2CardHeader[0].offsetHeight * 2}px`;
    }else{
        section2Sticky1.style.marginBottom = `${section2CardHeader[0].offsetHeight * 3.7}px`;
        section2Sticky2.style.marginBottom = `${section2CardHeader[0].offsetHeight * 1.85}px`;
    }

}

const initResize = () => {
    console.log("initResize");
    console.log(section2HeaderHeight);
    // setSection2CardContainerSticky();
    resizeSection2CardHeader();

}



// Initialize all animations when the document is ready
document.addEventListener('DOMContentLoaded', initResize);