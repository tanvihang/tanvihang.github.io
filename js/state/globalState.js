const GlobalState = (function(){
    let svgDoc;

    return {
        getSvgDoc: function(){
            return svgDoc;
        },
        setSvgDoc: function(doc){
            svgDoc = doc;
        }
    }
})();

export default GlobalState;