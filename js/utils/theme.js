const Theme = (function(){

    let instance;

    class ThemeSingletonClass{
        constructor(){
            if(!instance){
                this.themeNo = 1;
                return this;
            }

            return instance;
        }

        changeTheme(){
            var theme;
            if(this.themeNo % 2 == 1){
                fetch('../assets/theme.json')
                    .then(response => response.json())
                    .then(themes => {
                        theme = themes.dark;
                        this.paintItems(theme)
                    })
            }else{  
                fetch('../assets/theme.json')
                .then(response => response.json())
                .then(themes => {
                    theme = themes.light;
                    this.paintItems(theme)
                })
            }
            this.themeNo++;
        }

        paintItems(theme){
            let arrowArr = document.querySelectorAll(".arrow")

            arrowArr.forEach((arrow)=>{
                let doc = arrow.contentDocument;
                let instance = doc.querySelector("svg")
                instance.style.fill = theme.colors.text
            })

        }

    }

    return ThemeSingletonClass;
})();

export{Theme}