import { globalStyles } from "../../css/globalstyle.js";
import globalContext from "../../datas/globalContext.js";
import "../text/NavBarSelection/index.js";
import "../button/PlopButton/index.js";

class Header extends HTMLElement {
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
    while (globalStyles.cssRules.length === 0) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  }

  async render() {
    const title = this.getAttribute("title") || "Default Title";
    this.shadowRoot.innerHTML = `
            <style>
                @import url('/components/header/index.css');
            </style>

            <!-- Used for sticky purpose -->
            <div class = "outer-container">
            
                <!-- Contains shown menu and hidden menu -->
                <div class = "container">
                
                    <!-- Shown menu --> 
                    <div class = "inner-container">
                        <h1 class = "title">${title}</h1>
                        <div class = "nav-container">
                            <nav-bar-selection-custom id="menu-desk-lensvoyager" title = '[.LENSVOYAGER]' cta = 'lensvoyager'}></nav-bar-selection-custom>
                            <nav-bar-selection-custom id="menu-desk-about" title = 'ABOUT' cta = 'about'></nav-bar-selection-custom>
                            <nav-bar-selection-custom id = "menu-desk-projects" title = 'PROJECTS' cta = 'projects'></nav-bar-selection-custom>
                            <nav-bar-selection-custom id = "menu-desk-openForWork" title = 'OPEN FOR WORK' cta = 'openForWork' icon = "/assets/images/AutumnLeaf.gif"></nav-bar-selection-custom>
                            <plop-button-custom disable = true id="menu-button" title = "MENU" icon = "/assets/images/AutumnLeaf.gif"></plop-button-custom>
                        </div>
                    </div>

                    <!-- Hidden menu -->
                    <div class = "menu-mobile">
                      <div class = "menu-mobile-selection">
                        <nav-bar-selection-custom id="menu-lensvoyager" title = '[.LENSVOYAGER]' cta = 'lensvoyager'}></nav-bar-selection-custom>
                        <nav-bar-selection-custom id="menu-about" title = 'ABOUT' cta = 'about'></nav-bar-selection-custom>
                        <nav-bar-selection-custom id = "menu-projects" title = 'PROJECTS' cta = 'projects'></nav-bar-selection-custom>
                        <nav-bar-selection-custom id = "menu-openForWork" title = 'OPEN FOR WORK' cta = 'openForWork'></nav-bar-selection-custom>
                      </div>

                      <div class = "menu-mobile-footer">

                        <div class = "menu-mobile-footer-1">
                          <h1>AT</h1>
                        </div>

                        <div class = "menu-mobile-footer-2">
                          <h6>@2024</h6>
                          <h6>angustanworkspce.</h6>
                        </div>
                      </div>
                      
                    </div>
                </div>
            </div>
            
        `;

    await Promise.resolve();

    // DOM
    const outerContainer = this.shadowRoot.querySelector(".outer-container");
    const container = this.shadowRoot.querySelector(".container");
    const innerContainer = this.shadowRoot.querySelector(".inner-container");
    const tt = this.shadowRoot.querySelector(".title");
    const navContainer = this.shadowRoot.querySelector(".nav-container");
    const menuButton = this.shadowRoot.querySelector("#menu-button");
    const menuMobile = this.shadowRoot.querySelector(".menu-mobile");

    // Global variable
    var menuMobileHeight = 0;
    var flag = 0;
    var scrollInitial = true;
    var initialOpen = true;
    var initialHeight;

    // Get current page
    console.log("Current page")

    let curPage = window.location.href.toString().split("/");
    curPage = curPage[curPage.length -2]

    try{
      const menuElement =  this.shadowRoot.querySelector(`#menu-${curPage}`).shadowRoot.querySelector("p")
      const menuElementDesk =  this.shadowRoot.querySelector(`#menu-desk-${curPage}`).shadowRoot.querySelector("p")
      menuElement.classList.add("current-page")
      menuElementDesk.classList.add("current-page")
  
    }catch(error){

    }
    

    // Event listeners Title
    tt.addEventListener("click", () => {
      window.location.assign("/index.html");
    });

    // Event listener menu button
    menuButton.addEventListener("touchstart", () => {
      var isNotCollapsed = container.getAttribute("data-collapsed") === "true";

      // The one i should be looking out
      if (isNotCollapsed) {
        collapseSection(container);

        container.classList.remove("menu-mobile-open")
        outerContainer.classList.add("pad-top-outer")
        
        menuMobile.classList.remove("menu-mobile-show");

        // When at top of the screen
        if (
          navContainer.classList.contains("scroll-container") &&
          scrollInitial == true
        ) {
          outerContainer.classList.remove("pad-top-outer")
          navContainer.classList.remove("scroll-container");
          
          delayedHideOff();
          flag = 0;
        }
      } 
      else {
        expandSection(container);
        container.classList.add("menu-mobile-open");
        menuMobile.classList.add("menu-mobile-show");
        outerContainer.classList.remove("pad-top-outer")
        // When at top of the screen
        if (!navContainer.classList.contains("scroll-container")) {
          navContainer.classList.add("scroll-container");
          delayedHideOn();
          flag = 1;
        }
      }
    });

    let lastScrollPosition = 0;
    let scrollDown = false;

    // Event Listener - Scroll animation
    window.addEventListener("scroll", function () {
      var scrollPosition = scrollY;

      if (scrollPosition > 3 && flag == 0) {
        navContainer.classList.add("scroll-container");
        outerContainer.classList.add("pad-top-outer");
        this.setTimeout(delayedHideOn, 100);
        flag = 1;
        scrollInitial = false;
      }

      if (scrollPosition == 0) {
        container.classList.remove("menu-mobile-open")
        navContainer.classList.remove("scroll-container");
        outerContainer.classList.remove("pad-top-outer");

        this.setTimeout(delayedHideOff, 100);
        flag = 0;
        scrollInitial = true;

        var isNotCollapsed =
          container.getAttribute("data-collapsed") === "true";

        // Collapse the opened menu if back to top
        if (isNotCollapsed) {
          collapseSection(container);
          menuMobile.classList.remove("menu-mobile-show");

          if (
            navContainer.classList.contains("scroll-container") &&
            scrollInitial == true
          ) {
            navContainer.classList.remove("scroll-container");
            delayedHideOff();
            flag = 0;
          }
        }

        menuMobile.classList.remove("menu-mobile-show");

        return;
      }

      if(scrollPosition > lastScrollPosition && scrollPosition > 300 && !scrollDown){
        console.log("Scrolling down")
        // container.classList.add("container-scroll-down")
        setTimeout(delayedScrollDown, 100)
        scrollDown = true;
      }
      else if(scrollPosition < lastScrollPosition && scrollPosition > 300 && scrollDown){
        console.log("Scrolling up")
        // container.classList.remove("container-scroll-down")
        setTimeout(delayedScrollUp, 100)
        scrollDown = false;
      }

      lastScrollPosition = scrollPosition;
    });

    // Wait for things to render then only set the header height
    setTimeout(setHeaderHeight, 100)

    // Window size change
    window.addEventListener("resize", function () {
      setHeaderHeight();
    });

    function delayedHideOn() {
      tt.classList.add("hide-h1");
      container.classList.add("menu-mobile-scroll-down");
      // outerContainer.classList.add("pad-top-outer");
    }
    
    function delayedHideOff() {
      tt.classList.remove("hide-h1");
      container.classList.remove("menu-mobile-scroll-down");
      // outerContainer.classList.remove("pad-top-outer");
    }

    function delayedScrollDown(){
      // outerContainer.classList.add("outer-container-scroll-down")
      container.classList.add("container-scroll-down")
    }

    function delayedScrollUp(){
      // outerContainer.classList.remove("outer-container-scroll-down")
      container.classList.remove("container-scroll-down")
    }

    // State
    function setHeaderHeight() {
      const offsetHeight = container.scrollHeight;
      console.log(offsetHeight);
      // outerContainer.style.height = `${offsetHeight}px`
      outerContainer.style.height = `0px`;
      window.headerHeight = offsetHeight;
      globalContext.headerHeight.setState({ height: offsetHeight });
    }

    function collapseSection(element) {
      // var sectionHeight = element.scrollHeight;
      var sectionHeight = element.scrollHeight;
      console.log("Before closing - " + sectionHeight)

      // Temporarily disable the transition
      element.style.transition = "none";
      
      // Set the height explicitly
      element.style.height = sectionHeight + "px";
      
      // Trigger a reflow to make sure the change takes effect
      element.offsetHeight; // This line forces a reflow
      
      // Re-enable the transition
      element.style.transition = "";
    
      function transitionEndHandler(e) {
        element.removeEventListener("transitionend", transitionEndHandler);
        element.style.height = initialHeight + "px";
      }
    
      element.addEventListener("transitionend", transitionEndHandler);
    
      element.setAttribute("data-collapsed", "false");
    }
    

    function expandSection(element) {
      // get the height of the element's inner content, regardless of its actual size

      var sectionHeight = element.scrollHeight;
      
      menuMobileHeight = sectionHeight;

      if(initialOpen){
        initialHeight = menuMobileHeight;
        initialOpen = false;
      } 

      // temporarily disable all css transitions
      var elementTransition = element.style.transition;
      console.log(elementTransition);
      element.style.transition = "";

      // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      requestAnimationFrame(function () {
        element.style.height = sectionHeight + "px";
        element.style.transition = elementTransition;

        // on the next frame (as soon as the previous style change has taken effect),
        requestAnimationFrame(function () {
          element.style.height = 100 + "dvh";
        });
      });

      // mark the section as "currently collapsed"
      element.setAttribute("data-collapsed", "true");
    }
  }
}

customElements.define("header-custom", Header);