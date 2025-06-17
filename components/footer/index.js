import { globalStyles } from "../../css/globalstyle.js"


class Footer extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.initializeComponent()
    }

    async initializeComponent(){
        await this.ensureStyleLoaded()
        this.shadowRoot.adoptedStyleSheets = [globalStyles]
        this.render()
    }

    async ensureStyleLoaded(){
        while(globalStyles.cssRules.length === 0){
            await new Promise(resolve => requestAnimationFrame(resolve))
        }
    }

    async render(){
        this.shadowRoot.innerHTML = 
        `
            <style>
                @import url('/components/footer/index.css')
            </style>

            <div class = "footer outer-container">
                <div class = "container">
                    <div class = "footer-main">
                        <div class = "footer-main-title">
                            <h2>WHOOPS</h2>
                            <h2>IT'S</h2>
                            <h2>BOTTOM</h2>
                        </div>
                        <h3>BROWSE MORE <a href="/projects/" style="color: var(--link-hover);" >WORKS</a></h3>
                        <h3>CHECK OUT MY PHOTOGRAPHY</h3>
                        <h6 class="goto-photo"><a style="text-decoration: none; color: var(--link-hover);" href="/lensvoyager/">[.LENSVOYAGER]</a></h6>
                    </div>

                    <div class = "footer-end">
                        <h6>@angustan - 2024</h6>
                        <h6>angustanworkspce@gmail.com</h6>
                        <div class = "line"></div>
                    </div>

                    
                </div>
            </div>
        `
    }
}

customElements.define('footer-custom', Footer)