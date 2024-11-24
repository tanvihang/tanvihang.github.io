import {globalStyles} from '../../../css/globalstyle.js';
import globalContext from '/datas/globalContext.js'

class NavBarSelection extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.initializeComponent();
    }
    
    async initializeComponent(){
        await this.ensureStylesLoaded();
        this.shadowRoot.adoptedStyleSheets = [globalStyles]
        this.render();
    }

    async ensureStylesLoaded(){
        while(globalStyles.cssRules.length === 0){
            await new Promise(resolve => requestAnimationFrame(resolve))
        }
    }

    async render(){
        const title = this.getAttribute('title') || 'Default Title';
        const cta = this.getAttribute('cta') || '404';
        const icon = this.getAttribute('icon') 

        this.shadowRoot.innerHTML = 
        `
            <style>
                @import url('/components/text/NavBarSelection/index.css')
            </style>

            <div style = "display:flex; justify-content:center; align-items:center;">
                <p class = "title">${title}</p>
            </div>
        `

        // wait the dom to load
        await Promise.resolve();
        
        const titleDOM = this.shadowRoot.querySelector(".title");

        if(icon !== null){
            const imageElement = document.createElement('img')
            imageElement.src = icon
            imageElement.style.height = '47px'
            imageElement.style.rotate = '40rad'
            titleDOM.insertAdjacentElement('afterend', imageElement)
        }

        if (titleDOM) {
            titleDOM.addEventListener('click', () => {
                console.log("GOTO " + cta)
                window.location.assign(`/docs/${cta}/index.html`)
            });
        }
    }
}



customElements.define('nav-bar-selection-custom', NavBarSelection);