const Audio = (function(){

    let instance;

    class AudioClass{
        constructor(){
            if(!instance){
                this.createAudio()

                return this;
            }
            return instance
        }

        createAudio(){
            this.audio1 = document.getElementById("clickSound")
        }

        playAudio(){
            this.audio1.play();    
        }
    }

    return AudioClass;

})();

export {Audio}