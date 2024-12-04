# Personal Website
Visit the site - [tanvihang.github.io](https://tanvihang.github.io)

---

- [Personal Website](#personal-website)
- [About \& Goals](#about--goals)
  - [About](#about)
  - [Upcoming goals](#upcoming-goals)
- [Optimization \& Technique](#optimization--technique)
    - [1. Scroll event improvement](#1-scroll-event-improvement)
    - [2. Lazy load cards](#2-lazy-load-cards)
    - [3. Animation from display `none` to `something`](#3-animation-from-display-none-to-something)


---

# About & Goals

## About
**What** - This repo mainly act as my career portfolio, including UI/UX design, frontend developer.

**Why** - For this project I aim to learn as much frontend development as possible using minimal framework or use framework after understanding the hassle of boilerplate code.

## Upcoming goals
| Tasks                                 | Completion |
| ------------------------------------- | ---------- |
| State listener                        |            |
| Refactor js code into smaller section |            |
| Design and implement project screen   |            |
| Include CTA to easy contact           |            |


---
# Optimization & Technique
### 1. Scroll event improvement
Debounce function
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

### 2. Lazy load cards 

### 3. Animation from display `none` to `something`
go from `display: none;` into `display: block` animation.
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

<div style="text-align:right">Last Modified @ 2024/12/04 UTC +08:00</div>