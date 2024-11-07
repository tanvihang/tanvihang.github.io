import {debounce} from "./utils.js"
import {section3Top} from "./scroll.js"
// When hover on work card for computer, show the info


export const showHoverInfo = ()=>{


    const hoverContainer = document.querySelector(".section3-hover-container");
    const section3 = document.querySelector(".section3");
    const hoverContent = document.querySelector(".section3-works-container");
    const workCardsCustom = document.querySelectorAll("work-card-custom");
    const hoverImg = document.querySelector(".section3-hover-container-img");

    hoverContent.addEventListener("mouseenter", ()=>{
        hoverContainer.classList.add("section3-hover-container-show");
    })

    hoverContent.addEventListener("mouseleave", ()=>{
        hoverContainer.classList.remove("section3-hover-container-show");

    })

    workCardsCustom.forEach(card=>{
        card.addEventListener("mouseover", ()=>{

            const imgDict = JSON.parse(card.getAttribute("imgdict"))

            hoverImg.src = imgDict["image1"];
        })
    })

    // hoverContainer.style.transition = "left 0.05s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.05s cubic-bezier(0.25, 0.1, 0.25, 1)";
    section3.addEventListener("mousemove", (event)=>{

            const mouseX = event.clientX;
            const mouseY = event.clientY;
            hoverContainer.style.left = `${mouseX}px`;
            hoverContainer.style.top = `${mouseY - section3Top}px`;

    })
}