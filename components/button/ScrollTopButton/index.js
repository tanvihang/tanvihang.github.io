import { globalStyles } from "../../../css/globalstyle.js";
import globalContext from "/datas/globalContext.js";

class ScrollTopButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

  async render() {

    this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/button/ScrollTopButton/index.css')
            </style>

            <div class = "container">
                    <img src="/assets/svg/others/top.svg" width="32px" height="32px">
            </div>
        `;

    await Promise.resolve();

    const container = this.shadowRoot.querySelector(".container")

    function scrollFunction(){
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            container.classList.add("container-show")
          } else {
            container.classList.remove("container-show")
          }
    }

    function topFunction() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    window.onscroll = function(){scrollFunction()}

    container.addEventListener("click", ()=>{
        topFunction()    
    })

    container.addEventListener("")

  }
}

customElements.define("scroll-top-button", ScrollTopButton);
