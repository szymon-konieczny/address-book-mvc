export const on = (target, type, callback, capture) => target.addEventListener(type, callback, !!capture);

export const qs = selector => document.querySelector(selector);

export const ac = (parent, child) => parent.appendChild(child);

export const rc = (parent, child) => parent.removeChild(child);

export const ce = elementName => document.createElement(elementName);

export const showMessage = messageText => `<span class="message">${ messageText }</span>`;

export const isListEmpty = list => list.length <= 0 ? true : false;

export const isRequiredFieldNotEmpty = form => form.checkValidity() ? true : false;