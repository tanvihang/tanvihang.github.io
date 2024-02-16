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
                        theme = themes.light;
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
            var rightArrow = document.querySelector("#svg-arrow");
            rightArrow.fill = theme.colors.button_color;
            // console.log(rightArrow.children.children)
        }

    }

    return ThemeSingletonClass;
})();

export{Theme}