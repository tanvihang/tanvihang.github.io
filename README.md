# LENS VOYAGER

Update Log
| Date      | Features                           |
| --------- | ---------------------------------- |
| 2024/8/31 | Added scroll to top in lensvoyager |


---
## HOME PAGE

### Section 2

#### scroll event improvement (DONE)

1. cache docuemnt query

```js
section2CardElements = document.querySelectorAll("hero-card-custom");
```

2. Debounce function
```js
window.addEventListener('scroll', debounce(checkItemsInView, 100))

const debounce = (func, wait) => {
    let timeout;

    return function(...args){
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait);
    }
}
```

### header fix (DONE)
fixed: using header height change listener to update the header height.

### footer fix (DONE)
TODO experiment animation percentage for every scroll
**done**: used elementInView function written using getBoundingClientRect
better approach: use CSS animate, works perfectly!
```css
   animation-timeline: view();
   animation-range: 20% 50%;
```

### lazy load cards (TODO)
TODO implement
not done: still need to find better approach

## LENS VOYAGER PAGE
### map changing (DONE)
map go from `display: none;` into `display: block` animation.
```
.component{
    display: none;
    opacity: 0;
}

.show{
    display: block;
    opacity: 1;

    @starting-style{
        opacity: 0;
    }
}
```

### world map load weird occur (TODO)
problems is when first load sometimes it does not render the country selection.

