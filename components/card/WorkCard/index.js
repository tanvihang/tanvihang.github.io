import scale from "../../../constants/scale.js";
import { globalStyles } from "../../../css/globalstyle.js";

class WorkCard extends HTMLElement {
  constructor() {
    // initialize HTMLElement constructor
    super();
    // can use other css
    this.attachShadow({ mode: "open" });
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

  async render() {
    const isDesktop = () => {
      return window.innerWidth > scale.windowWidth.desktop;
    };

    const imgDict = this.getAttribute("imgDict");
    const imgJson = JSON.parse(imgDict);

    const id = imgJson.id;
    const title = imgJson.title;
    const year = imgJson.year;
    const jobType = imgJson.jobType;
    const projectType = imgJson.projectType;
    const tags = imgJson.tags;
    const cta = imgJson.cta;
    const image1 = imgJson.image1;
    const last = imgJson.last;

    this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/card/WorkCard/index.css')
            </style>

            <div class ="work-card-container">
                <div class="work-card-header">
                    <h5 class="section3-text" style="color: var(--text-body-invert);">(0${id}) ${title}</h5>
                    <div class="circle-container">
                        <div class="triangle"></div>
                    </div>
                </div>
                <div class = "work-card-content">
                    ${
                      !isDesktop() && image1
                        ? `<img class= "work-image-card" src="${image1}" alt="${title}" >`
                        : !isDesktop() && !image1
                        ? `<div class = "work-image-card-empty">
                            <h1 style="color: var(--text-body-invert);">WIP</h1>
                        </div>`
                        : ""
                    }
                    }
                </div>
            </div>
        `;

    await Promise.resolve();

    // Get the h5 element and circle container
    const titleElement = this.shadowRoot.querySelector("h5");
    const circleContainer = this.shadowRoot.querySelector(".circle-container");
    const triangle = this.shadowRoot.querySelector(".triangle");
    const container = this.shadowRoot.querySelector(".work-card-container");
    const image = this.shadowRoot.querySelector(".work-card-image");

    const content = this.shadowRoot.querySelector(".work-card-content");

    // Set the circle container dimensions based on h5 height
    if (titleElement && circleContainer) {
      const titleHeight = titleElement.offsetHeight * 1.3;
      circleContainer.style.width = `${titleHeight}px`;
      circleContainer.style.height = `${titleHeight}px`;

      // Adjust triangle size proportionally
      const triangleSize = titleHeight * 0.3; // 30% of circle size
      triangle.style.borderLeft = `${triangleSize * 0.6}px solid transparent`;
      triangle.style.borderRight = `${triangleSize * 0.6}px solid transparent`;
      triangle.style.borderBottom = `${triangleSize}px solid var(--text-body)`;
    }


    if(last){
        container.style.borderBottom = `1px solid var(--border-body)`
    }

    let isCollapsed = true;
    // Function to calculate heights
    const calculateHeights = () => {
        // Temporarily remove collapsed class to get true height
        content.classList.remove('collapsed');
        
        const headerHeight = 
            this.shadowRoot.querySelector(".work-card-header").offsetHeight +
            2 * parseInt(getComputedStyle(container).paddingTop);
        
        const contentHeight = content.scrollHeight; // Use scrollHeight instead of offsetHeight
        console.log("Content height:", contentHeight);
        
        // Add collapsed class back if we're in collapsed state
        if (isCollapsed) {
            content.classList.add('collapsed');
        }
        
        return {
            headerHeight,
            fullHeight: headerHeight + contentHeight + parseInt(getComputedStyle(container).gap)
        };
    };

    // Wait for image to load before calculating heights
    if (image) {
        await new Promise((resolve) => {
            if (image.complete) {
                resolve();
            } else {
                image.onload = () => resolve();
            }
        });
    }

    // Initial setup
    const heights = calculateHeights();
    container.style.height = `${heights.headerHeight}px`;
    content.classList.add('collapsed'); // Add collapsed class after measuring

    // Click handler
    circleContainer.addEventListener("click", () => {
        isCollapsed = !isCollapsed;
        
        if (isCollapsed) {
            container.style.height = `${heights.headerHeight}px`;
            content.classList.add('collapsed');
        } else {
            const newHeights = calculateHeights(); // Recalculate in case of dynamic content
            container.style.height = `${newHeights.fullHeight}px`;
            content.classList.remove('collapsed');
        }

        circleContainer.classList.toggle("rotated");
    });


    // hover show info for computer(screen width > 1079)
    if (window.innerWidth >= scale.windowWidth.desktop) {

        // hide the triangle and circle container
        triangle.style.display = "none";
        circleContainer.style.display = "none";

    } else {

    }
  }
}

customElements.define("work-card-custom", WorkCard);
