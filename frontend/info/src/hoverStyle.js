export function setHoverStyle(style, func=null) {
    return function(e) {
        if (func) {
            func(e);
        }

        for (let prop in style) {
            e.target.style.setProperty(prop, style[prop]);
        }
        e.target.style.transition = "0.1s";

    }
}

export function setNormalStyle(style, func=null) {
    return function(e) {
        if (func) {
            func(e);
        }

        for (let prop in style) {
            e.target.style.setProperty(prop, style[prop]);
        }

    }
}
