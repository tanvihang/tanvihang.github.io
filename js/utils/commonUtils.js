const Theme = (function(){
    let themeNo;

    function changeTheme(){
        var theme;

        if(themeNo % 2 == 1){
            fetch('../assets/theme.json')
                .then(response => response.json())
                .then(themes => {
                    theme = themes.light;
                    paintItems(theme)
                })
        }else{  
            fetch('../assets/theme.json')
            .then(response => response.json())
            .then(themes => {
                theme = themes.light;
                paintItems(theme)
            })
        }
        themeNo++;
    }

    function paintItems(theme){
        var rightArrow = document.querySelector("#svg-arrow");
        rightArrow.fill = theme.colors.button_color;
        console.log(rightArrow.children.children)
    }

    function init(){
        themeNo = 1;
    }

    return{
        init: init,
        changeTheme: changeTheme
    }
})();

const Image = (function(){
    let popularImageUrlList;

    function init(){
        //example api call to get images links
        popularImageUrlList = ["image1.png","image3.png","image2.png","image4.png","image6.png","image3.png","image2.png","image5.png"];
        var path = "../../Images/image/"
    }

    function loadImages(){
        var my_work_images = document.querySelector(".my-work-images");
        var containerTEMP = document.createElement("div");
        containerTEMP.classList.add("containerTEMP");
        var sectionCount = Math.ceil(popularImageUrlList.length/4);

        containerTEMP.style.width = sectionCount * 100 + "vw";

        var count = 0;

        for(let i =0; i<sectionCount; i++){
            var section = document.createElement("section");
            section.classList.add("image-section");
            for(let j = count; j < count+4; j++ ){
                var div = document.createElement("div");
                var innerDiv = document.createElement("div");
                innerDiv.classList.add("image-section-img")
                var imageURLString = 'url(../Images/image/' + popularImageUrlList[j] + ')';
                innerDiv.style.backgroundImage= imageURLString;
                
                console.log(innerDiv)
                //TODO ADD custom listener for each of them to show 
                // testing
                innerDiv.addEventListener('mouseover',function(event){
                    changeText(event,popularImageUrlList[j])
                })
                innerDiv.addEventListener('mouseleave',handleMouseLeave)


                div.appendChild(innerDiv);
                section.appendChild(div);
            }
            count +=4;
            containerTEMP.appendChild(section);
            console.log(containerTEMP)
        }

        my_work_images.appendChild(containerTEMP);
    }

    function changeText(event,imageDescription){
        var textSection = document.querySelector(".break-line-text");
        textSection.textContent = imageDescription;
    }

    function handleMouseLeave(event){
        var textSection = document.querySelector(".break-line-text");
        textSection.textContent = "Scroll To Explore.";
    }

    return{
        init: init,
        loadImages: loadImages
    }
})();

export {Theme, Image};