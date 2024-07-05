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
        const title = this.getAttribute("title")
        const url = this.getAttribute("url")
        const description = this.getAttribute("description")
        const location = this.getAttribute("location")
        const date = this.getAttribute("date")
        const tags = this.getAttribute("tags")

        this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/card/ImageCard/index.css')
            </style>

            <div class = "image-card-container">
                <div class = "image-card-img">
                    <img data-src = ${url} class = "lazy-load" >
                </div>

                <div class = "image-card-info">
                    <h6>${title}</h6>
                    <p>${description}</p>
                    <p>${date}</p>
                    <p>${location}</p>
                </div>

            </div>
        `

        await Promise.resolve()

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
        }

        // lazy load
        if("IntersectionObserver" in window){
            console.log("HI")
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    const image = entry.target
                    image.src = image.dataset.src
                    observer.unobserve(image);
                })
            },{
                root: null, // Use the viewport as the root
                rootMargin: '0px',
                threshold: 0.1 // Trigger when 10% of the image is in view
            })

            imageObserver.observe(lazyLoadImage)
        }


    }

}

customElements.define("image-card-custom", ImageCard)