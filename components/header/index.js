import {globalStyles} from '../../css/globalstyle.js';
import globalContext from '../../datas/globalContext.js'
import '../text/NavBarSelection/index.js';
import '../button/PlopButton/index.js';

class Header extends HTMLElement{
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
        
        this.shadowRoot.innerHTML = 
        `
            <style>
                @import url('/components/header/index.css');
            </style>

            <div class = "outer-container">
                <div class = "container">
                    <h1 class = "title">${title}</h1>
                    <div class = "nav-container">
                        <nav-bar-selection-custom title = '[.LENSVOYAGER]' cta = 'lensvoyager'}></nav-bar-selection-custom>
                        <nav-bar-selection-custom title = 'ABOUT' cta = 'about'></nav-bar-selection-custom>
                        <nav-bar-selection-custom title = 'PROJECTS' cta = 'projects'></nav-bar-selection-custom>
                        <nav-bar-selection-custom title = 'OPEN FOR WORK' cta = 'openForWork' icon = "/assets/images/AutumnLeaf.gif"></nav-bar-selection-custom>
                        <plop-button-custom title = "MENU" icon = "/assets/images/AutumnLeaf.gif"></plop-button-custom>
                    </div>
                </div>
            </div>
        `

        await Promise.resolve();


        // DOM
        const outerContainer = this.shadowRoot.querySelector(".outer-container");
        const container = this.shadowRoot.querySelector(".container");
        const tt = this.shadowRoot.querySelector(".title");
        const navContainer = this.shadowRoot.querySelector(".nav-container");


        tt.addEventListener('click', ()=>{
            window.location.assign('/index.html')
        })

        // scroll animation
        var flag = 0
        window.addEventListener('scroll', function(){
            var scrollPosition = scrollY;

            if(scrollPosition > 1 && flag == 0){
                navContainer.classList.add("scroll-container")
                this.setTimeout(delayedHideOn, 100)
                flag = 1;
            }
            if(scrollPosition == 0){
                navContainer.classList.remove("scroll-container")
                this.setTimeout(delayedHideOff, 100)
                flag = 0;
            }
        })

        setHeaderHeight()

        // window size change
        window.addEventListener('resize', function(){
            setHeaderHeight()
        })


        function delayedHideOn(){
            tt.classList.add("hide-h1")
            container.classList.add("scroll-height")
            outerContainer.classList.add("pad-top-outer")
        }

        function delayedHideOff(){
            tt.classList.remove("hide-h1")
            container.classList.remove("scroll-height")
            outerContainer.classList.remove("pad-top-outer")
        }
        
        // State
        function setHeaderHeight(){
            const offsetHeight = container.offsetHeight;
            console.log(offsetHeight)
            // outerContainer.style.height = `${offsetHeight}px`
            outerContainer.style.height = `0px`
            window.headerHeight = offsetHeight;
            globalContext.headerHeight.setState({height: offsetHeight});

        }
       
    }
    
}



customElements.define('header-custom', Header);
