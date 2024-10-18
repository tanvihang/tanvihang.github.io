import { globalStyles } from "../../../css/globalstyle.js";
import globalContext from "/datas/globalContext.js";

class ImageCard extends HTMLElement{

    constructor(){
        // initialize HTMLElement constructor
        super()
        // can use other css
        this.attachShadow({mode:"open"})
        // initialize Component
        this.initializeComponent();
    }

    async initializeComponent() {
        await this.ensureStylesLoaded();
        this.shadowRoot.adoptedStyleSheets = [globalStyles];
        this.render();
    }
    
    async ensureStylesLoaded() {
        while (globalStyles.cssRules.length == 0) {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
    }

    async render(){
        const imgDict = this.getAttribute("imgDict")
        // console.log(imgDict)
        const imgJson = JSON.parse(imgDict)

        const convertedTitle = imgJson.title.replaceAll("/s/", " ")
        const convertedDescription = imgJson.description.replaceAll("/s/", " ")

        const mobileLayout = window.innerWidth > 319 && window.innerWidth < 768;


        this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/card/ImageCard/index.css')
            </style>

            <div class = "image-card-container">

            <div class = "image-card-img">
                    <div class="loading-spinner"></div> <!-- Loading indicator -->
                    <img data-src = ${imgJson.url} class = "lazy-load hidden" >
                </div>



                ${
                    mobileLayout ? '' :
                    `
                    <div class = "image-card-info">
                        <h6>${convertedTitle}</h6>
                        <p>${convertedDescription}</p>
                        <p>${imgJson.date}</p>
                        <p>${imgJson.location}</p>
                    </div>
                    `
                }

            </div>
        `

        
        await Promise.resolve()

        const imageCardImage = this.shadowRoot.querySelector(".image-card-img")
        const imageCard = this.shadowRoot.querySelector(".image-card-container")
        const imageCardInfo = this.shadowRoot.querySelector(".image-card-info")
        const lazyLoadImage = this.shadowRoot.querySelector(".lazy-load")

        // hover show info for computer(screen width > 1079)
        if(window.innerWidth > 1079){
            imageCard.addEventListener("mouseenter", ()=>{
                imageCardInfo.classList.add("show-info")
            })
            
            imageCard.addEventListener("mouseleave",()=>{
                imageCardInfo.classList.remove("show-info")
            })
        }else{
            imageCardImage.addEventListener("click", () => {
                console.log("clicked")
                // render image
                const fullScreenElementPic = document.querySelector('#mobile-image-fullscreen-pic');
                fullScreenElementPic.innerHTML = `<img src = ${imgJson.url} alt="Full Image">`;
                
                // render infos
                const fullScreenElementInfo = document.querySelector('#mobile-image-fullscreen-info');
                fullScreenElementInfo.innerHTML = `
                    <h6>${convertedTitle}</h6>
                    <p>${convertedDescription}</p>
                    <p>${imgJson.date}</p>
                    <p>${imgJson.location}</p>
                `
                
                
                // show the block
                const fullScreenElement = document.querySelector('#mobile-image-fullscreen');
                fullScreenElement.classList.add('show');
            })
        }

        // lazy load
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const spinner = image.previousElementSibling;

                // Start loading the image
                image.src = image.dataset.src;
                // console.log("Rendered - " + image.src)

                image.onload = () => {
                    // console.log("Image loaded:", image.src);
                    spinner.classList.add("hidden");  // Hide spinner
                    image.classList.add("show");      // Make the image visible
                };
                

                // Handle loading errors
                image.onerror = () => {
                    spinner.textContent = "Failed to load";
                };

                observer.unobserve(image); // Stop observing this image
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    imageObserver.observe(this.shadowRoot.querySelector(".lazy-load"));
}



    }

}

customElements.define("image-card-custom", ImageCard)