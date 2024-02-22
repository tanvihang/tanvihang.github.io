import GlobalState from "./state/globalState.js";
import { MapModule } from "./map/map.js";
import { CarouselImage } from "./utils/carouselImage.js";
import { Theme } from "./utils/theme.js";
import { GsapAnimation } from "./utils/gsapAnimation.js";
import { MenuItem } from "./utils/menu.js";
    

window.onload = function(){
    // var themeBtn = document.querySelector("#logo-icon");
    // var mapSVG = document.querySelector("#svgMap");
    // var westMalaysia = (document.querySelector("#svgWestMalaysia"));
    // westMalaysia = westMalaysia.contentDocument;
    // var eastMalaysia = (document.querySelector("#svgEastMalaysia"));
    // eastMalaysia = eastMalaysia.contentDocument;


    // // Global State
    // GlobalState.setSvgDoc(mapSVG.contentDocument);
    // var svgDoc = GlobalState.getSvgDoc();

    // // Global theme 
    // let theme = new Theme();
    // themeBtn.addEventListener('click',()=>{
    //     document.body.classList.toggle('dark-theme');
    //     MapModule.changeTheme();
    //     theme.changeTheme();
    // })

    // // Map Module
    // MapModule.init(svgDoc,eastMalaysia,westMalaysia)

    // // Carousel Images
    // let popularImageUrlList = ["image1.png","image3.png","image2.png","image4.png","image6.png","image3.png","image2.png","image5.png"];
    // let path = "url(../assets/Images/image/"
    // let carouselImage = new CarouselImage(popularImageUrlList,path);
    // carouselImage.loadImages();


    // //Gsap animation
    // let gsapAnimation = new GsapAnimation();
    // //build horizontal scroll first so it occupy the end size
    // gsapAnimation.buildHorizontalScroll();
    // gsapAnimation.buildVerticalScroll();

    // // Header Hover
    // var logo = document.querySelector(".left-container");
    // var containerr = document.querySelector(".inner-container");
    // logo.addEventListener("mouseenter",handleLogoOver);
    // containerr.addEventListener("mouseleave",handleLogoLeave)

    let menuItem = new MenuItem();
    menuItem.loadMenu(document.documentElement.clientWidth);
}



function handleLogoOver(){
    var rightContainer = document.querySelector(".right-container");
    rightContainer.style.transform = "scaleX(1)";

    var leftContainer = document.querySelector(".left-container");
    leftContainer.classList.toggle("left-container-hover")
}

function handleLogoLeave(){
    var rightContainer = document.querySelector(".right-container");
    rightContainer.style.transform = "scaleX(0)";

    var leftContainer = document.querySelector(".left-container");
    leftContainer.classList.remove("left-container-hover")
}