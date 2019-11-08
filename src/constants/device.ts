export const DOC = document;

export const UA = navigator.userAgent;

export const iOS = navigator.platform.indexOf('iP') === 0;

export const isIE11 = UA.indexOf('Trident') > -1; // IE11 only, else "MSIE "

export const isAndroid = /android/i.test(UA);

export const isMobileUserAgent = /Mobile/i.test(UA);

export const isMobile = iOS || isAndroid || isMobileUserAgent;

export const isUIWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(UA);

export const lg_WebKit = /safari|chrome/i.test(UA) && !iOS && !isAndroid;

export const TOUCHES = window.ontouchstart !== void 0;

// export const USE_HAS_FEATURE = DOC.implementation && DOC.implementation.hasFeature && DOC.implementation.hasFeature('', '') !== true;
// export const MOUSE_WHEEL_EVENT = 'onwheel' in DOC || (USE_HAS_FEATURE && DOC.implementation.hasFeature('Events.wheel', '3.0')) ? 'wheel' : 'mousewheel';
