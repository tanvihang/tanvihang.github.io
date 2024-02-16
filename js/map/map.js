import GlobalState from "../state/globalState.js";
let svgDoc = GlobalState.getSvgDoc();

const MapModule = (function(){
    let svgDoc;
    let eastMalaysia;
    let westMalaysia;
    let countryList;
    let countryJSONData;
    let themeNo;
    let themeG;

    function getCountryCode(event){
        var countryCode;
        if(event.target.id){
            countryCode = event.target.id; 
        }
        else{
            countryCode = event.target.parentElement.id;
        }
    
        return countryCode;
    }
    
    function mapClick(event){
        var countryCode = getCountryCode(event);
    
        var country = svgDoc.querySelector(`#${countryCode}`)
        
        // console.log(countryCode);
        event.stopPropagation();
    }
    
    function mapHover(event,color){
        // console.log(color)
        var countryCode = getCountryCode(event);
    
        var country = svgDoc.querySelector(`#${countryCode}`);  
    
        country.style.fill = color;
        // console.log(country.id)
    
        var imageList = countryJSONData.countries[countryCode].image;
        var svgMapImage = document.querySelector("#svgMapImage");
        svgMapImage.style.backgroundImage = "url(../assets/Images/countries/"+countryCode +"/"+ imageList[Math.floor(Math.random() *(imageList.length))] +")"

    }
    
    function mapLeave(event,color){
        var countryCode = getCountryCode(event);
    
        var country = svgDoc.querySelector(`#${countryCode}`);
    
        country.style.fill = color;
    
        var svgMapImage = document.querySelector("#svgMapImage");

        svgMapImage.style.display = "none";

    }

    function mapMove(event){
        var countryCode = getCountryCode(event);
        var svgMapImage = document.querySelector("#svgMapImage");

        svgMapImage.style.display = "block";
        svgMapImage.style.top = event.clientY + 50 + "px";
        svgMapImage.style.left = event.clientX + 70 + "px";

    }

    function changeTheme(){

        var theme;

        if(svgDoc){
            //Light theme
            if(themeNo % 2 == 1){
                themeNo++;
                fetch('../assets/theme.json')
                .then(response => response.json())
                .then(themes => {
                    theme = themes.light;
                    paintMap(theme)
                })
            }else{
                themeNo++;
                fetch('../assets/theme.json')
                .then(response => response.json())
                .then(themes => {
                    theme = themes.dark;
                    paintMap(theme)
                })
            }
        }
    
    }

    function paintMap(theme){

        themeG = theme;
        var list = svgDoc.querySelectorAll(`[id]`);
    
        if(list.length>0){
            list.forEach(item => {
                item.style.fill = theme.colors.primary_trans;
            });
        }


        //check database to color the country
        countryList.forEach(country => {
            var countryObj = svgDoc.querySelectorAll(`#${country}`);

            countryObj.forEach(coun =>{
                coun.style.fill=theme.colors.accent_trans;
                coun.addEventListener('click', mapClick);
                coun.addEventListener('mouseover',function(event){mapHover(event,theme.colors.accent_hover_trans)});
                coun.addEventListener('mouseleave',function(event){mapLeave(event,theme.colors.accent_trans)});
                coun.addEventListener('mousemove',function(event){mapMove(event)})
            })
        })

        //paint east west malaysia
        // console.log(westMalaysia)


        westMalaysia.firstChild.style.fill = theme.colors.primary_trans;
        eastMalaysia.firstChild.style.fill = theme.colors.primary_trans;
    }

    function init(svgDocument, eastMy, westMy){
        svgDoc = svgDocument;
        eastMalaysia = eastMy;
        westMalaysia = westMy;
    
        //reading JSON file with fetch, asynchronous is not avaiable for web, its only suitable for node environment
        fetch("./js/map/mapProperties.json")
            .then(response => response.json())
            .then(data => {
                countryJSONData = data
                countryList = countryJSONData.hasTravelled
            })
            .catch(error => {
                console.log("Error fetching Json", error)
            })

        themeNo = 1;
    
        changeTheme();
    }

    return{
        init: init,
        changeTheme: changeTheme
    };

})();




export {MapModule}