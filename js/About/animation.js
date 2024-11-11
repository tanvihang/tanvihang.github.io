
const aboutHeader = document.querySelectorAll('.scroll-reveal h2');
const aboutUnique = document.querySelector('.unique-description');
const aboutUIUX = document.querySelector('.uiux-description');

gsap.registerPlugin(ScrollTrigger);

const initAnimations = () => {


    console.log("Animations initialized");

    aboutHeader.forEach((header) => {
        gsap.to(
            header,
        {
            backgroundSize: '100% 100%',
            scrollTrigger:{
                trigger: header,
                start: 'top 100%',
                end: 'top 70%',
                scrub: true,
            }
        }
    )
    })

    gsap.to(
        aboutUnique,
        {
            backgroundSize: '100% 100%',
            color: 'white',
            scrollTrigger:{
                trigger: aboutUnique,
                start: 'top 100%',
                end: 'top 70%',
                scrub: true,
            }
        }
    )

    gsap.to(
        aboutUIUX,
        {
            padding: '2rem',
            scrollTrigger:{
                trigger: aboutUIUX,
                start: 'top 100%',
                end: 'top 70%',
                scrub: true,
            }
        }
    )

}

document.addEventListener('DOMContentLoaded', initAnimations);

