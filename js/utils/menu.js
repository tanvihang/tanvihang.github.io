// make a singleton menu item
const MenuItem = (function(){

    let instance;

    class MenuItemClass{
        constructor(){
            if(!instance){
                this.menuBtn = document.querySelector(".menu-bar-mobile")
                
                return this;
            }

            return instance;
        }

        // When window size changed, call this function
        loadMenu(windowWidth){
            this.loadMobile();
        }

        loadMobile(){
            this.menuBtn.addEventListener('click',mobileClick)
        }
    }

    return MenuItemClass;

})()

export {MenuItem}

function mobileClick(){
    let menuHeader = document.querySelector(".header1-inner1")

    toggleMenuItem()
}

function toggleMenuItem(){
    let menuHeader = document.querySelector(".header1-inner1")
    let menuIconImage = document.querySelector(".icon-image")
    let menuIconName = document.querySelector("#icon-name")

    let menuItemSection = document.querySelector(".menu-item-section")
    
    let menuBarCircle = document.querySelector(".menu-bar-circle")
    let menuBarLine1 = document.querySelector(".menu-bar-line1")
    let menuBarLine2 = document.querySelector(".menu-bar-line2")

    menuHeader.classList.toggle("menu-item-section-open")
    menuIconImage.classList.toggle("menu-item-section-open-icon")
    menuIconName.classList.toggle("menu-item-section-open-text")

    menuItemSection.classList.toggle("menu-item-section-open-1")

    menuBarCircle.classList.toggle("menu-item-section-open-menu-circle")
    menuBarLine1.classList.toggle("menu-item-section-open-menu-line-1")
    menuBarLine2.classList.toggle("menu-item-section-open-menu-line-2")

}