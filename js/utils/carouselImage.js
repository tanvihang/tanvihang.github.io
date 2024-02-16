const CarouselImage = (function(){
    
    //Carousel Image Instance
    let instance;

    class CarouselImageSingletonClass{

        constructor(popularWorksImageList, path){
            if(!instance){
                this.popularWorksImageList = popularWorksImageList;
                this.path = path;

                return this;
            };

            return instance;
        }
        
        loadImages(){
            var my_work_images = document.querySelector(".my-work-images");
            var containerTEMP = document.createElement("div");
            containerTEMP.classList.add("containerTEMP");
            var sectionCount = Math.ceil(this.popularWorksImageList.length/4);
    
            containerTEMP.style.width = sectionCount * 100 + "vw";
    
            var count = 0;
    
            for(let i =0; i<sectionCount; i++){
                var section = document.createElement("section");
                section.classList.add("image-section");
                for(let j = count; j < count+4; j++ ){
                    var div = document.createElement("div");
                    var innerDiv = document.createElement("div");
                    innerDiv.classList.add("image-section-img")
                    var imageURLString = this.path + this.popularWorksImageList[j] + ')';
                    innerDiv.style.backgroundImage= imageURLString;
                    
                    // console.log(innerDiv)
                    //TODO ADD custom listener for each of them to show 
                    // testing
                    innerDiv.addEventListener('mouseover',(event)=> this.changeText(event, this.popularWorksImageList[j]))
                    innerDiv.addEventListener('mouseleave',this.handleMouseLeave)
    
    
                    div.appendChild(innerDiv);
                    section.appendChild(div);
                }
                count +=4;
                containerTEMP.appendChild(section);
                // console.log(containerTEMP)
            }
    
            my_work_images.appendChild(containerTEMP);
        }
        
        changeText(event,imageDescription){
            var textSection = document.querySelector(".break-line-text");
            textSection.textContent = imageDescription;
        }

        handleMouseLeave(event){
            var textSection = document.querySelector(".break-line-text");
            textSection.textContent = "Scroll To Explore.";
        }

    }
    return CarouselImageSingletonClass;
})();

export {CarouselImage}