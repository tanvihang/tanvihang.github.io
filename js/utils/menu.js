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
    let menuItemSectionH4 = document.querySelector("#menu-item-section-h4")
    let menuItemSectionH5Array = document.querySelectorAll(".menu-items h5")
    let menuItemSectionSeperationLine = document.querySelector(".seperation-line")

    let menuBarCircle = document.querySelector(".menu-bar-circle")
    let menuBarLine1 = document.querySelector(".menu-bar-line1")
    let menuBarLine2 = document.querySelector(".menu-bar-line2")

    menuHeader.classList.toggle("menu-item-section-open")
    menuIconImage.classList.toggle("menu-item-section-open-icon")
    menuIconName.classList.toggle("menu-item-section-open-text")

    menuItemSection.classList.toggle("menu-item-section-open-1")
    menuItemSectionH4.classList.toggle("menu-item-section-innertext")
    menuItemSectionH5Array.forEach((item)=>{
        item.classList.toggle("menu-item-section-innertext2")
    })
    menuItemSectionSeperationLine.classList.toggle("menu-item-section-open-line");

    menuBarCircle.classList.toggle("menu-item-section-open-menu-circle")
    menuBarLine1.classList.toggle("menu-item-section-open-menu-line-1")
    menuBarLine2.classList.toggle("menu-item-section-open-menu-line-2")

}