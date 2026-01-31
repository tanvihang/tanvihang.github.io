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
                        <h3>WHOOPS IT’S BOTTOM!</h3>
                        <div class = "footer-main-title">
                            <h2>Let's</h2>
                            <h2 class="build-button">BUILD →</h2>
                            <h2>Something Cool!</h2>
                        </div>
                    </div>

                    <div class = "footer-end">
                        <h6>@angustan - 2026</h6>
                        <h6>angustanworkspce@gmail.com</h6>

                        <div class="social-icons">
                            <a href="https://github.com/tanvihang" target="_blank" rel="noopener noreferrer" class="social-link">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/angustan2001/" target="_blank" rel="noopener noreferrer" class="social-link">
                                <img src="/assets/icons/LinkedIn SVG Icon.svg" width="20" height="20" alt="LinkedIn" />
                            </a>
                            <a href="https://www.xiaohongshu.com/user/profile/6314a574000000001200272c" target="_blank" rel="noopener noreferrer" class="social-link">
                                <img src="/assets/icons/Xiaohongshu Logo.svg" width="20" height="20" alt="RedNote" />
                            </a>
                        </div>

                        <div class = "line"></div>
                    </div>

                    
                </div>
            </div>
        `

        await Promise.resolve();

        // ...existing code...
        this.shadowRoot.querySelector('.build-button')?.addEventListener('click', () => {
            
            if (window.gtag) {
                console.log('Build button clicked');
                window.gtag('event', 'click', {
                    'event_category': 'Footer',
                    'event_label': 'BUILD Button'
                });
                // window.location.href = '/openForWork/index.html';
            }
        });
    }

}

customElements.define('footer-custom', Footer)