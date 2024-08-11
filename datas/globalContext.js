import { ViStateManager } from "../js/StateManager/vi.js"

const GlobalStateManager = (function(){
    const headerHeight = new ViStateManager({height:0})
    const headerWidth = new ViStateManager({width:0})
    const hasTravelled = new ViStateManager({})
    const selectedCountry = new ViStateManager({country:""})
    const selectedProvince = new ViStateManager({province:""})
    const selectedCategory = new ViStateManager({category:""})
    const selectedSubCategory = new ViStateManager({subCategory:""})
    const currentPage = new ViStateManager({currentPage: ""})
    
    fetch("/datas/mapProperties.json")
    .then(response => response.json())
    .then(data => {
        let countryJSONData = data
        let countryList = countryJSONData.hasTravelled
        hasTravelled.setState(countryList)
        console.log(hasTravelled)
    })
    .catch(error => {
        console.log("Error fetching Json", error)
    })

    
    return{
        headerHeight,
        headerWidth,
        hasTravelled,
        selectedCountry,
        selectedProvince,
        selectedCategory,
        selectedSubCategory,
        currentPage
    }

})();

export default GlobalStateManager

