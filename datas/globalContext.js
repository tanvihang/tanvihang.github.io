import { ViStateManager } from "../js/StateManager/vi.js"

const GlobalStateManager = (function(){
    const headerHeight = new ViStateManager({height:0})
    const headerWidth = new ViStateManager({width:0})

    return{
        headerHeight,
        headerWidth
    }

})();

export default GlobalStateManager

