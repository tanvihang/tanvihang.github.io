import scale from "../../../constants/scale.js";
import { globalStyles } from "../../../css/globalstyle.js";

class WorkCard extends HTMLElement {
  constructor() {
    // initialize HTMLElement constructor
    super();
    // can use other css
    this.attachShadow({ mode: "open" });
    this.expansionManager = null;
    this.isCollapsed = true;
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
    const hasHover = window.matchMedia('(hover: hover)').matches;

    const isDesktop = () => {
      return window.innerWidth > scale.windowWidth.desktop && hasHover;
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
                <div class="work-card-header" style="cursor: pointer;" data-cta="${cta}">
                    <h5 class="section3-text" style="color: var(--text-body-invert);">(0${id}) ${title}</h5>
                    <div class="circle-container">
                        <div class="triangle"></div>
                    </div>
                </div>
                <div class = "work-card-content">
                    ${
                      !isDesktop() && image1
                        ? `<img class= "work-image-card" src="${image1}" alt="${title}" data-cta="${cta}" style="cursor: pointer;" >`
                        : !isDesktop() && !image1
                        ? `<div class = "work-image-card-empty">
                            <h1 style="color: var(--text-body-invert);">WIP</h1>
                        </div>`
                        : ""
                    }
                </div>
                </div>
            </div>
        `;

    await Promise.resolve();

    // Get the h5 element and circle container
    const titleHeader = this.shadowRoot.querySelector(".work-card-header");
    const titleElement = this.shadowRoot.querySelector("h5");
    const circleContainer = this.shadowRoot.querySelector(".circle-container");
    const triangle = this.shadowRoot.querySelector(".triangle");
    const container = this.shadowRoot.querySelector(".work-card-container");
    const image = this.shadowRoot.querySelector(".work-image-card");

    const content = this.shadowRoot.querySelector(".work-card-content");

    // Add click handlers for navigation
    const navigateToProject = (ctaPath) => {
      if (ctaPath) {
        window.location.href = `/${ctaPath}/index.html`;
      }
    };

    // Desktop: Click on title to navigate
    if (titleHeader && isDesktop()) {
      titleHeader.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const ctaPath = titleHeader.getAttribute("data-cta");
        navigateToProject(ctaPath);
      });
    }

    // Mobile: Click on image to navigate
    if (image) {
      image.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const ctaPath = image.getAttribute("data-cta");
        navigateToProject(ctaPath);
      });
    }

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

    // Add method to set expansion manager
    this.setExpansionManager = (manager) => {
        this.expansionManager = manager;
    };

    // Add method to collapse this card (called from external manager)
    this.collapseCard = () => {
        if (!this.isCollapsed) {
            this.isCollapsed = true;
            container.style.height = `${heights.headerHeight}px`;
            content.classList.add('collapsed');
            circleContainer.classList.remove("rotated");
        }
    };

    let isCollapsed = true;
    this.isCollapsed = isCollapsed;
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
        if (this.isCollapsed) {
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
    circleContainer.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling to parent elements
        
        const cardId = this.getAttribute('id');
        
        // If currently collapsed, expand this card and close others
        if (this.isCollapsed) {
            // Notify expansion manager to close other cards
            if (this.expansionManager) {
                this.expansionManager.expandCard(cardId);
            }
            
            this.isCollapsed = false;
            const newHeights = calculateHeights();
            container.style.height = `${newHeights.fullHeight}px`;
            content.classList.remove('collapsed');
            circleContainer.classList.add("rotated");
        } else {
            // Collapse this card
            if (this.expansionManager) {
                this.expansionManager.collapseCard(cardId);
            }
            
            this.isCollapsed = true;
            container.style.height = `${heights.headerHeight}px`;
            content.classList.add('collapsed');
            circleContainer.classList.remove("rotated");
        }
    });



    
    // hover show info for computer(screen width > 1079)
    if (hasHover && window.innerWidth >= scale.windowWidth.desktop) {

        // hide the triangle and circle container
        triangle.style.display = "none";
        circleContainer.style.display = "none";

    } else {

    }
  }
}

customElements.define("work-card-custom", WorkCard);
