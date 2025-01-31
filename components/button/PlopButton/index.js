import { globalStyles } from "../../../css/globalstyle.js";
import globalContext from "/datas/globalContext.js";

class PlopButton extends HTMLElement {
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
    const title = this.getAttribute("title") || "Default Title";
    const disable = this.getAttribute("disable") || "false";
    // cta naming convention type-specific type
    const cta = this.getAttribute("CTA") || "404";
    const icon = this.getAttribute("icon");


    this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/button/PlopButton/index.css')
            </style>

            <div class = "outer-container no-highlight">
                <div class = "container no-highlight">
                    <p class = "title no-highlight">${title}</p>
                </div>
            </div>
        `;

    await Promise.resolve();

    const container = this.shadowRoot.querySelector(".container");

    if (icon !== null) {
      const imageElement = document.createElement("img");
      imageElement.src = icon;
      imageElement.style.height = "47px";
      imageElement.style.rotate = "40rad";
      container.insertAdjacentElement("afterend", imageElement);
    }

    // plop button click listener
    container.addEventListener("click", () => {
      let ctaSplit = cta.split("-");

      console.log(ctaSplit)

      if(disable == "true"){

        container.style.pointerEvents = "none";
        container.style.opacity = "0.6";

        setTimeout(() => {
          container.style.pointerEvents = "auto";
          container.style.opacity = "1";            
        }, 1000);

        return;
      }

      switch (ctaSplit[0]) {
        case "BackWorldMap":
          let worldMap = document.querySelector("#svgMap");
          let countryCanvas = document.querySelector("#country");
          let backButton = document.querySelector(".back");

          worldMap.classList.toggle("hide");
          countryCanvas.classList.toggle("show");
          backButton.classList.toggle("show");
          break;

        case "category":
          globalContext.selectedCategory.setState({ category: ctaSplit[1] });
          break;

        case "Skies":
          globalContext.selectedSubCategory.setState({
            subCategory: cta,
          });
          break;

        case "Seasons":
          globalContext.selectedSubCategory.setState({
            subCategory: cta,
          });
          break;

        case "Yoyo":
          globalContext.selectedSubCategory.setState({
            subCategory: cta,
          });
          break;
        
        case "CNY":
          globalContext.selectedSubCategory.setState({
            subCategory: cta,
          });
          break;

        
      }



    });
  }
}

customElements.define("plop-button-custom", PlopButton);
