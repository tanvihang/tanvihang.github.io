import GlobalState from "./state/globalState.js";
import { MapModule } from "./map/map.js";
import { Theme, Image } from "./utils/commonUtils.js";

    

window.onload = function(){
    var themeBtn = document.querySelector("#logo-icon");
    var mapSVG = document.querySelector("#svgMap");
    var westMalaysia = (document.querySelector("#svgWestMalaysia"));
    westMalaysia = westMalaysia.contentDocument;
    var eastMalaysia = (document.querySelector("#svgEastMalaysia"));
    eastMalaysia = eastMalaysia.contentDocument;

    GlobalState.setSvgDoc(mapSVG.contentDocument);
    var svgDoc = GlobalState.getSvgDoc();

    MapModule.init(svgDoc,eastMalaysia,westMalaysia)
    Theme.init();

    themeBtn.addEventListener('click',()=>{
        document.body.classList.toggle('dark-theme');
        MapModule.changeTheme();
        Theme.changeTheme();
    })

    Image.init()
    Image.loadImages();

    // trying out horizontal scroll
    const myImageContainer = document.querySelector('.containerTEMP');
    const sections = gsap.utils.toArray('.containerTEMP section');
    
    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length-1),
        ease: "none",
        scrollTrigger:{
            trigger: ".my-work",
            id:"myImageContainer",
            pin:true,
            scrub:3,
            end: ()=> "+=" +
                document.querySelector(".containerTEMP").offsetWidth
        }
    })

    let snapping_vertical = gsap.utils.toArray('.snapping-vertical')

    snapping_vertical.forEach((item,index)=>{
        gsap.to(item, {
            delay:0,
            scrollTrigger:{
                trigger:item,
                start: "top top",
                end: "bottom top",
                snap: {
                    snapTo:1,
                    duration:{min:0.2, max:1},
                    delay:0,
                },
                scrub:1,
                // markers:true,
                id: index,
            }
        })
        
        
    })

    let snapping_vertical_special = gsap.utils.toArray('.snapping_verticalspecial')
    ScrollTrigger.create({
            trigger: snapping_vertical_special,
            start: "top bottom",
            end: "bottom bottom",
            snap: {
                snapTo:1,
                duration:{min:0.2, max:1},
                delay:0.01,

            },
            scrub: 1,
            // markers:true,
            id: "special"
    })

    let snapping_vertical2 = gsap.utils.toArray('.snapping_vertical2')

    snapping_vertical2.forEach((item,index)=>{
        ScrollTrigger.create({
            trigger:item,
            start: "top bottom",
            end: "bottom bottom",
            snap: {
                snapTo:1,
                duration:{min:0.2, max:1},
                delay:0.01,
            },
            scrub: 1,
            // markers:true,
            id: index
        })
    })


    var logo = document.querySelector(".left-container");
    var containerr = document.querySelector(".inner-container");
    logo.addEventListener("mouseenter",handleLogoOver);
    containerr.addEventListener("mouseleave",handleLogoLeave)


    let hoverItem = document.querySelectorAll(".testhover")
    let hiddenItem = document.querySelector(".hiddenItem")

    hoverItem.forEach(element => {
        element.addEventListener("mousemove",handleMouseOverHoverItem)
        element.addEventListener("mouseleave",handleMouseLeaveHoverItem)
    });


    function handleMouseOverHoverItem(){
        let country = event.target.classList[1]
        hiddenItem.style.top = event.clientY+ 10 + 'px'
        hiddenItem.style.left = event.clientX + 10 + 'px'
        hiddenItem.style.display = "block"
        hiddenItem.style.opacity = 1

        //can use map function for each location~~~
        if(country == "en"){
            hiddenItem.style.backgroundColor = "red"
        }else{
            hiddenItem.style.backgroundColor = "yellow"

        }
    }

    function handleMouseLeaveHoverItem(){
        hiddenItem.style.display = "none"
    }

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