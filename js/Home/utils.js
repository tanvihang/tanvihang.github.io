/**
 * Utility Functions
 * Collection of helper functions used throughout the application
 */

/**
 * DOM Element Size Adjustments
 */
export function adjustFillerBlockHeight() {
    const servicesText = document.querySelector('.section2-header-text');
    const fillerBlock = document.querySelector('.filler-block');
    if (servicesText && fillerBlock) {
        const textHeight = servicesText.offsetHeight;
        fillerBlock.style.height = `${textHeight}px`;
        fillerBlock.style.width = `${textHeight}px`;
    }
}

/**
 * Header Height Management
 */
export function setHeaderHeight(height) {
    const filler = document.querySelector(".hero-filler");
    if (window.innerWidth > 319 && window.innerWidth < 768) {
        filler.style.height = '70px';
    } else {
        filler.style.height = '250px';
    }
}

/**
 * Viewport Detection
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset percentage from the viewport edge
 * @returns {boolean} - Whether the element is in viewport
 */
export function isElementInViewport(element, offset = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight * (1 - offset / 100) &&
        rect.bottom >= windowHeight * (offset / 100)
    );
}

/**
 * Debounce Function
 * Limits the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle Function
 * Ensures a function is called at most once in a specified time period
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get Viewport Size
 * @returns {Object} - Object containing viewport width and height
 */
export function getViewportSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}

/**
 * Check if Device is Mobile
 * @returns {boolean} - Whether the device is mobile
 */
export function isMobileDevice() {
    return window.innerWidth < 768;
}

/**
 * Format Number with Commas
 * @param {number} number - Number to format
 * @returns {string} - Formatted number string
 */
export function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Generate Random ID
 * @param {number} length - Length of the ID
 * @returns {string} - Random ID
 */
export function generateRandomId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Smooth Scroll To Element
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from the top in pixels
 */
export function smoothScrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Get Element Dimensions
 * @param {HTMLElement} element - Element to measure
 * @returns {Object} - Object containing element dimensions
 */
export function getElementDimensions(element) {
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset,
        right: rect.right + window.pageXOffset
    };
}

/**
 * Add Event Listener with Automatic Cleanup
 * @param {HTMLElement} element - Element to attach listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} - Cleanup function
 */
export function addEventListenerWithCleanup(element, event, handler) {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
}

/**
 * Parse URL Parameters
 * @returns {Object} - Object containing URL parameters
 */
export function parseURLParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
}

/**
 * Local Storage Wrapper
 */
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

/**
 * Copy to Clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Whether the copy was successful
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text:', err);
        return false;
    }
}

/**
 * Format Date
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string (e.g., 'YYYY-MM-DD')
 * @returns {string} - Formatted date string
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}