import globalContext from "../../datas/globalContext.js";

const MapModule = (function () {
  let svgDoc;
  let countryList;
  let themeNo;
  let theme;

  let worldMap = document.querySelector("#svgMap");
  let countryCanvas = document.querySelector("#country");
  let backButton = document.querySelector(".back");
  let countryName = document.querySelector("#countryName")
  let countryNameBlock = document.querySelector("#countryNameBlock")

  function getCountryCode(event) {
    var countryCode;
    if (event.target.id) {
      countryCode = event.target.id;
    } else {
      countryCode = event.target.parentElement.id;
    }

    return countryCode;
  }

  function mapClick(event) {
    var countryCode = getCountryCode(event);

    var country = svgDoc.querySelector(`#${countryCode}`);

    globalContext.selectedCountry.setState({country: countryCode})
    // re-render by explicity remove and adding object tag
    if (country) {
      let newCountryCanvas = document.createElement("object");
      newCountryCanvas.id = "country";
      newCountryCanvas.type = "image/svg+xml";
      newCountryCanvas.data = `/assets/svg/world/${countryCode}.svg`;

      // Paint the province city after tag finish rendered
      newCountryCanvas.addEventListener("load", () => {
        // Paint
        paintProvinceCity(countryCode);
      });

      countryCanvas.replaceWith(newCountryCanvas);
      countryCanvas = newCountryCanvas;

      worldMap.classList.toggle("hide");
      countryCanvas.classList.toggle("show");
      backButton.classList.toggle("show");
    }
  }

  function provinceClick(event, doc) {
    let countryCode = getCountryCode(event);
    let province = doc.querySelector(`#${countryCode}`);

    globalContext.selectedProvince.setState({province: countryCode})


  }

  function mapHover(event, color, doc = svgDoc) {
    var countryCode = getCountryCode(event);

    var country = doc.querySelector(`#${countryCode}`);

    country.style.fill = color;

    countryName.innerHTML = countryCode
    countryNameBlock.classList.add("text-animation")
    if(doc != svgDoc){
    }
  }

  function mapLeave(event, color, doc = svgDoc) {
    var countryCode = getCountryCode(event);
    // console.log(countryCode);

    var country = doc.querySelector(`#${countryCode}`);

    country.style.fill = color;

    // var svgMapImage = document.querySelector("#svgMapImage");

    // svgMapImage.style.display = "none";

    countryNameBlock.classList.remove("text-animation")
    if(doc != svgDoc){
    }
  }

  function mapMove(event) {
    var countryCode = getCountryCode(event);
    var svgMapImage = document.querySelector("#svgMapImage");

    // svgMapImage.style.display = "block";
    // svgMapImage.style.top = event.clientY + 50 + "px";
    // svgMapImage.style.left = event.clientX + 70 + "px";
  }

  function changeTheme() {
    if (svgDoc) {
      // //Light theme
      // if (themeNo % 2 == 1) {
      //   themeNo++;
      //   fetch("/assets/theme.json")
      //     .then((response) => response.json())
      //     .then((themes) => {
      //       theme = themes.light;
      //       paintMap(theme);
      //     });
      // } else {
      //   themeNo++;
      //   fetch("/assets/theme.json")
      //     .then((response) => response.json())
      //     .then((themes) => {
      //       theme = themes.dark;
      //       paintMap(theme);
      //     });
      // }
    }
  }

  function paintMap(theme) {
    countryList = globalContext.hasTravelled;
    console.log(countryList)

    for (let countryId in countryList.state) {
      let country = countryList.state[countryId];

      var countryObj = svgDoc.querySelectorAll(`#${country}`);

      countryObj.forEach((coun) => {
        coun.style.fill = theme.colors.accent_trans;
        coun.style.cursor = "pointer";
        coun.addEventListener("click", mapClick);
        coun.addEventListener("mouseover", function (event) {
          mapHover(event, theme.colors.accent_hover_trans);
        });
        coun.addEventListener("mouseleave", function (event) {
          mapLeave(event, theme.colors.accent_trans);
        });
        coun.addEventListener("mousemove", function (event) {
          mapMove(event);
        });
      });
    }
  }

  function paintProvinceCity(countryCode) {
    let hasTravelled;
    let countryCanvas = document.querySelector("#country");
    countryCanvas = countryCanvas.contentDocument;

    // Fetch the province coresponding city
    fetch(`/datas/Countries/${countryCode}.json`)
      .then((response) => (response = response.json()))
      .then((response) => {
        hasTravelled = response.hasTravelled;
        paintMapColor(hasTravelled, countryCanvas);
      })
      .catch((error) => console.log(error));
  }

  function paintMapColor(ids, svg) {
    ids.forEach((id) => {
      // console.log(id);
      let place = svg.querySelector(`#${id}`);
      place.style.fill = theme.colors.accent_trans;
      place.style.cursor = "pointer";
      place.addEventListener("click", function (event) {
        provinceClick(event, svg);
      });
      place.addEventListener("touchstart", function (event) {
        provinceClick(event, svg);
      });
      place.addEventListener("mouseover", function (event) {
        mapHover(event, theme.colors.accent_hover_trans, svg);
      });
      place.addEventListener("mouseleave", function (event) {
        mapLeave(event, theme.colors.accent_trans, svg);
      });
      place.addEventListener("touchend", function (event) {
        mapLeave(event, theme.colors.accent_trans, svg);
      });
    });
  }

  async function init(svgDocument) {
    svgDoc = svgDocument;

    themeNo = 1;

    // changeTheme();
    await fetch("/assets/theme.json")
    .then((response) => response.json())
    .then((themes) => {
      theme = themes.light;
      console.log("Paint")
      paintMap(theme);
    });

    console.log("AFTER")
  }

  return {
    init: init,
    changeTheme: changeTheme,
    paintProvinceCity: paintProvinceCity,
  };
})();

export { MapModule };
