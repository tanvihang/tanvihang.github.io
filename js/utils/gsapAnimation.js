const GsapAnimation = (function(){
    
    let instance;

    class GsapAnimationClass{

        constructor(){
            if(!instance){
                return this;
            }

            return instance;
        }
        
        buildVerticalScroll(){
            this._verticalScroll();
        }

        buildHorizontalScroll(){
            this._horizontalScroll();
        }

        _verticalScroll(){
            //find sections that want to snap on vertical
            let snapping_vertical = gsap.utils.toArray('.snapping-vertical');

            snapping_vertical.forEach((item,index)=>{
                gsap.to(item, {
                    delay:0,
                    scrollTrigger:{
                        trigger:item,
                        start: "top top",
                        end: "bottom top",
                        snap: {
                            snapTo:1,
                            duration:{min:0.2, max:1},
                            delay:0,
                        },
                        scrub:1,
                        // markers:true,
                        id: index,
                    }
                })           
            })

            let snapping_vertical_special = gsap.utils.toArray('.snapping_verticalspecial')
            ScrollTrigger.create({
                    trigger: snapping_vertical_special,
                    start: "top bottom",
                    end: "bottom bottom",
                    snap: {
                        snapTo:1,
                        duration:{min:0.2, max:1},
                        delay:0.01,
        
                    },
                    scrub: 1,
                    // markers:true,
                    id: "special"
            })
        
            let snapping_vertical2 = gsap.utils.toArray('.snapping_vertical2')
        
            snapping_vertical2.forEach((item,index)=>{
                ScrollTrigger.create({
                    trigger:item,
                    start: "top bottom",
                    end: "bottom bottom",
                    snap: {
                        snapTo:1,
                        duration:{min:0.2, max:1},
                        delay:0.01,
                    },
                    scrub: 1,
                    // markers:true,
                    id: index
                })
            })


        }

        _horizontalScroll(){
            //find the blocks that want to apply vertical scroll
            let sections = gsap.utils.toArray('.containerTEMP section');

            //create GSAP object
            let scrollTween = gsap.to(sections,{
                xPercent: -100 * (sections.length-1), //animation, do transform xPercentage -100%
                ease: "none",
                scrollTrigger:{
                    trigger: ".my-work",
                    id:"myImageContainer",
                    pin:true,
                    scrub:3,
                    // markers:true,
                    end: () => "+=" + document.querySelector(".containerTEMP").offsetWidth
                }
            })
        }

    }

    return GsapAnimationClass;

})();

export {GsapAnimation}