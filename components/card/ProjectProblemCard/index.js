import scale from "../../../constants/scale.js";
import { globalStyles } from "../../../css/globalstyle.js";

class ProjectProblemCard extends HTMLElement {
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
    const hasHover = window.matchMedia('(hover: hover)').matches;

    const isDesktop = () => {
      return window.innerWidth > scale.windowWidth.desktop && hasHover;
    };

    const problemData = this.getAttribute("problemData");
    const problemJson = JSON.parse(problemData);

    const number = problemJson.number;
    const title = problemJson.title;
    const description = problemJson.description;
    const image = problemJson.image;
    const cta = problemJson.cta;
    const titleColor = problemJson.titleColor || '#000'; // Default to black if not provided

    this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/card/ProjectProblemCard/index.css')
            </style>

            <div class="problem-card" data-cta="${cta || ''}" style="cursor: ${cta ? 'pointer' : 'default'};">
                <div class="problem-card-content">
                    <div class="problem-card-header">
                        <h2 style="color:${titleColor}">${number} /</h2>
                        <h4>${title}</h4>
                    </div>
                    <p>${description}</p>
                </div>
                ${image ? `
                    <div class="problem-card-image">
                        <img src="${image}" alt="${title}">
                    </div>
                ` : ''}
            </div>
        `;

    await Promise.resolve();

    // Get the card element
    const card = this.shadowRoot.querySelector(".problem-card");

    // Add click handler for navigation if CTA is provided
    if (cta && card) {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Navigate to the CTA path
        if (cta.startsWith('http')) {
          // External link
          window.open(cta, '_blank', 'noopener,noreferrer');
        } else {
          // Internal link
          window.location.href = cta.startsWith('/') ? cta : `/${cta}`;
        }
      });
    }

    // Add keyboard accessibility
    if (cta && card) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${title}`);
      
      card.addEventListener("keydown", (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    }
  }
}

customElements.define("project-problem-card", ProjectProblemCard);
