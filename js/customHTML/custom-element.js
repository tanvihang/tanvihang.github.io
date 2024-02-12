const typographyCSS = new CSSStyleSheet();
const themeCSS = new CSSStyleSheet();

const redborderpx = "*{border: 1px red solid; margin:0; padding:0;}"

fetch('css/base/typography.css')
    .then(response => response.text())
    .then(cssText => {
        cssText += redborderpx;
        typographyCSS.replaceSync(cssText);
    })
    .catch(error => {
        console.error("Error fetching or applying the stylesheet")
    })

fetch('css/base/theme.css')
    .then(response => response.text())
    .then(cssText =>{
        themeCSS.replaceSync(cssText)
    })
    .catch(error=>{
        console.errer("Error fetching or applying the stylesheet")
    })

export class MyHeader extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode:'open'});

        const container = document.createElement('div');

        container.innerHTML = '<h1>My custom element!</h1>';
    
        shadow.adoptedStyleSheets = [typographyCSS]
        shadow.appendChild(container);
    }
}

export class MyImageContainer extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode:'open'});
    }
}

customElements.define('my-header',MyHeader);