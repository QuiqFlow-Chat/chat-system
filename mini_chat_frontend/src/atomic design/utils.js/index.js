/**
 * Utility function to create HTML elements dynamically
 */
const createElement = (tag, attributes = {}, textContent = '', styles = {}) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element[key] = value);
    if (textContent) element.textContent = textContent;
    Object.assign(element.style, styles);
    return element;
};

export {
    createElement,
}