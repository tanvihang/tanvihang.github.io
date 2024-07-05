# LENS VOYAGER

## HOME PAGE

### Section 2

#### scroll event improvement

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

### header fix
TODO experiment height change animation

### footer fix
TODO experiment animation percentage for every scroll

### lazy load cards
TODO implement