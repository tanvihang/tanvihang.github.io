/**
 * Loader Animation Controller
 * Handles the initial loading animation with the ANGUS text reveal
 */

class LoaderController {
    constructor() {
        this.loader = null;
        this.loaderText = null;
        this.animationDuration = 2000; // Duration of loading animation in ms
        this.fadeOutDuration = 1000;   // Duration of fade out in ms
    }

    /**
     * Initialize the loader
     */
    init() {
        // Create loader elements
        this.createLoader();
        
        // Start loading sequence
        this.startLoading();

        // Prevent scrolling while loader is active
        document.body.style.overflow = 'hidden';
    }

    /**
     * Create loader DOM elements
     */
    createLoader() {
        // Create loader container
        this.loader = document.createElement('div');
        this.loader.className = 'loader';
        
        // Create loader text
        this.loaderText = document.createElement('div');
        this.loaderText.className = 'loader-text';
        this.loaderText.textContent = 'ANGUS';
        
        // Append elements
        this.loader.appendChild(this.loaderText);
        document.body.insertBefore(this.loader, document.body.firstChild);

        // Add necessary styles if not already in CSS
        this.addLoaderStyles();
    }

    /**
     * Add loader styles dynamically if not in CSS
     */
    addLoaderStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity ${this.fadeOutDuration}ms ease;
                opacity: 1;
            }

            .loader.hidden {
                opacity: 0;
                pointer-events: none;
            }

            .loader-text {
                font-size: var(--h1-font-size);
                font-family: 'PPAcma', serif;
                letter-spacing: 0.1em;
                font-weight: bold;
                color: gray;
                position: relative;
                overflow: hidden;
            }

            .loader-text::after {
                content: 'ANGUS';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                color: black;
                background: black;
                overflow: hidden;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: loading ${this.animationDuration}ms linear forwards;
            }

            @keyframes loading {
                0% { width: 0; }
                100% { width: 100%; }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    /**
     * Start the loading sequence
     */
    startLoading() {
        // Wait for animation to complete
        setTimeout(() => {
            this.hideLoader();
        }, this.animationDuration);
    }

    /**
     * Hide the loader
     */
    hideLoader() {
        if (this.loader) {
            // Add hidden class for fade out
            this.loader.classList.add('hidden');
            
            // Re-enable scrolling
            document.body.style.overflow = '';

            // Remove loader after fade out
            setTimeout(() => {
                this.loader.remove();
            }, this.fadeOutDuration);
        }
    }

    /**
     * Show the loader (useful for manual control)
     */
    showLoader() {
        if (this.loader) {
            this.loader.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            this.init();
        }
    }
}

// Create and export loader instance
const loader = new LoaderController();

// Initialize loader when document is ready
document.addEventListener('DOMContentLoaded', () => {
    loader.init();
});

// Export for use in other files
export default loader;

// Optional: Export specific methods if needed
export const { showLoader, hideLoader } = loader;