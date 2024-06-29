const elementIsInViewPort = (element, percentage) => {
  const rect = element.getBoundingClientRect();

  const inView = window.innerHeight * (2 - percentage/100);

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= inView;
};

const debounce = (func, wait) => {
    let timeout;

    return function(...args){
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait);
    }
}

// in view
// bottom: 508.3333282470703;
// height: 387.68768310546875;
// left: 0;
// right: 375.3753662109375;
// top: 120.64564514160156;
// width: 375.3753662109375;
// x: 0;
// y: 120.64564514160156;

// at bottom
// bottom: 937.6126098632812;
// height: 387.68768310546875;
// left: 0;
// right: 375.3753662109375;
// top: 549.9249267578125;
// width: 375.3753662109375;
// x: 0;
// y: 549.9249267578125;

// at top

export { elementIsInViewPort, debounce };
