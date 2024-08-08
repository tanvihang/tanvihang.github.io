import { globalStyles } from "../../css/globalstyle.js";
import globalContext from "../../datas/globalContext.js";

class MapJS extends HTMLElement {
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
    const rootPath = "/components/mapJS";
    const worldJsonPath = "/datas/mapProperties.json";
    const countriesJsonRootPath = "/datas/Countries";

    this.shadowRoot.innerHTML = `
        <style>
            @import url('${rootPath}/index.css');
        </style>

        <div class="container">
            <div class="mobile-scroll-indicator">
                <img class="mobile-scroll-eye-indicator" src="/assets/svg/others/eye.svg" width="25px">
                <p>((swipe to look around))</p>
            </div>

            <div class="back">
                <plop-button-custom
                title="back"
                cta="BackWorldMap"
                ></plop-button-custom>
            </div>
                
            <div class="map-container">
                <!-- World Map -->
                <object
                id="svgMap"
                type="image/svg+xml"
                data="${rootPath}/svg/world-map.svg"
                ></object>

                <!-- Country Map -->
                <object id="country" type="image/svg+xml"></object>

                <!-- Country/State Name -->
                <div id="countryNameBlock">
                    <h2 id="countryName"></h2>
                </div>
            </div>
        </div>
    `;

    let countryCanvas = this.shadowRoot.querySelector("#country");
    let svgMap = this.shadowRoot.querySelector("#svgMap");
    let backButton = this.shadowRoot.querySelector(".back");
    let countryName = this.shadowRoot.querySelector("#countryName");
    let countryNameBlock = this.shadowRoot.querySelector("#countryNameBlock");

    // 1. Get Country List
    const world = await fetch(worldJsonPath).then(response => response.json());
    const hasTravelled = world.hasTravelled;

    // 2. Wait for SVG to load
    svgMap.addEventListener("load", async () => {
      const svgDoc = svgMap.contentDocument;
      const theme = await fetch(`${rootPath}/theme.json`).then(response => response.json()).then(themes => themes.light);
      
      // 3. Paint Map
      paintMap(theme, hasTravelled, svgDoc);

      // 4. Backbutton on click
      backButton.addEventListener("click", () => {
        svgMap.classList.toggle("hide");
        countryCanvas.classList.toggle("show");
        backButton.classList.toggle("show");
      });

      function paintMap(theme, ids, svg) {
        ids.forEach((id) => {
          var countryObj = svg.querySelectorAll(`#${id}`);

          countryObj.forEach((coun) => {
            coun.style.fill = theme.colors.accent_trans;
            coun.style.cursor = "pointer";

            if (svg !== svgDoc) {
              coun.addEventListener("click", function (event) {
                provinceClick(event, svg);
              });
              coun.addEventListener("touchstart", function (event) {
                provinceClick(event, svg);
              });
            } else {
              coun.addEventListener("click", mapClick);
            }

            coun.addEventListener("mouseover", function (event) {
              mapHover(event, theme.colors.accent_hover_trans, svg);
            });
            coun.addEventListener("mouseleave", function (event) {
              mapLeave(event, theme.colors.accent_trans, svg);
            });
            coun.addEventListener("mousemove", function (event) {
              mapMove(event);
            });
          });
        });
      }

      function paintProvinceCity(countryCode) {
        let hasTravelledState;
        let countryCanvasDoc = countryCanvas.contentDocument;

        fetch(`${countriesJsonRootPath}/${countryCode}.json`)
          .then((response) => response.json())
          .then((response) => {
            hasTravelledState = response.hasTravelled;
            paintMap(theme, hasTravelledState, countryCanvasDoc);
          })
          .catch((error) => console.log(error));
      }

      function mapClick(event) {
        var countryCode = getCountryCode(event);

        var country = svgDoc.querySelector(`#${countryCode}`);

        globalContext.selectedCountry.setState({ country: countryCode });
        if (country) {
          let newCountryCanvas = document.createElement("object");
          newCountryCanvas.id = "country";
          newCountryCanvas.type = "image/svg+xml";
          newCountryCanvas.data = `${rootPath}/svg/countries/${countryCode}.svg`;

          newCountryCanvas.addEventListener("load", () => {
            paintProvinceCity(countryCode);
          });

          countryCanvas.replaceWith(newCountryCanvas);
          countryCanvas = newCountryCanvas;

          svgMap.classList.toggle("hide");
          countryCanvas.classList.toggle("show");
          backButton.classList.toggle("show");
        }
      }

      function mapHover(event, color, doc = svgDoc) {
        var countryCode = getCountryCode(event);

        var country = doc.querySelector(`#${countryCode}`);

        country.style.fill = color;

        countryName.innerHTML = countryCode;
        countryNameBlock.classList.add("text-animation");
      }

      function mapLeave(event, color, doc = svgDoc) {
        var countryCode = getCountryCode(event);

        var country = doc.querySelector(`#${countryCode}`);

        country.style.fill = color;

        countryNameBlock.classList.remove("text-animation");
      }

      function mapMove(event) {
        var countryCode = getCountryCode(event);
        var svgMapImage = document.querySelector("#svgMapImage");
      }

      function getCountryCode(event) {
        var countryCode;
        if (event.target.id) {
          countryCode = event.target.id;
        } else {
          countryCode = event.target.parentElement.id;
        }

        return countryCode;
      }

    
    //   The one that provides you functionality when selected province/state 省
      function provinceClick(event, doc) {
        let countryCode = getCountryCode(event);
        let province = doc.querySelector(`#${countryCode}`);

        globalContext.selectedProvince.setState({ province: countryCode });
      }
    });
  }
}

customElements.define("map-js", MapJS);
