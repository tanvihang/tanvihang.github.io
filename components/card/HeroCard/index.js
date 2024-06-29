import { globalStyles } from "../../../css/globalstyle.js";
import "../../button/PlopButton/index.js"

class HeroCard extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.initializeComponent()
    }

    async initializeComponent(){
        await this.ensureStyleLoaded();
        this.shadowRoot.adoptedStyleSheets = [globalStyles]
        this.render()
    }

    async ensureStyleLoaded(){
        while(globalStyles.cssRules.length === 0){
            await new Promise(resolve => requestAnimationFrame(resolve))
        }
    }

    async render(){
        const work = this.getAttribute('work');
        const workJson = JSON.parse(work);
        
        if(workJson !== null){

            this.shadowRoot.innerHTML = 
            `
                <style>
                    @import url("/components/card/HeroCard/index.css")
                </style>

                <div class = "card-block">
                    <div class = "card-main-info">
                        <h3>${workJson.title}</h3>
                        <div class = "card-main-info-sub">
                            <plop-button-custom
                                title = ${workJson.year}
                                CTA = ${workJson.cta}
                            ></plop-button-custom>

                            <p>${workJson.projectType}</p>
                            <p>${workJson.jobType}</p>
                        </div>
                    </div>

                    <div class = "card-image-sub-info">
                        <div class = "card-image">
                            <div class = "image1-block">
                                <img class = "image1" src = "${workJson.image1}" alt = "image1"/>
                            </div>
                            <div class = "image2-block">
                                <img class = "image2" src = "${workJson.image2}" alt = ""image2/>
                            </div>
                        </div>

                        <div class = "card-sub-info">
                            <div class = "card-sub-info-main">
                                <h6>${workJson.description}</h6>
                            </div>
                            <div class = "card-sub-info-tag">

                            </div>
                        </div>
                    </div>

                    <div class = "breakLine"></div>
                </div>
            `

            await Promise.resolve();

            const cardBlock = this.shadowRoot.querySelector(".card-block")
            const cardSubInfoTag = this.shadowRoot.querySelector(".card-sub-info-tag");
            

            renderTags()

            window.addEventListener('resize', () => {
                if(window.innerWidth > 319 && window.innerWidth < 768){
                    cardBlock.addEventListener('touchstart',() => {
                        cardBlock.classList.add("card-block-click");
                    }, {passive:true})
        
                    cardBlock.addEventListener('touchend',() => {
                        cardBlock.classList.remove("card-block-click");
                    }, {passive:true})
                }else{

                }
            })

            function renderTags(){
                let innerHTML = ``;

                workJson.tags.forEach(tag => {
                    let element = 
                    `
                        <plop-button-custom
                            title = ${tag}
                        ></plop-button-custom>
                    `

                    innerHTML += element;
                });

                cardSubInfoTag.innerHTML = innerHTML;
            }
        }

    }
}

customElements.define('hero-card-custom', HeroCard)