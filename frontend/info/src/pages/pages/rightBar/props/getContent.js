export default function getContent(obj) {

    let props = new Map([
        ["width", "50px"],
        ["height", "21px"], 
        ["margin-top", "0px"], 
        ["margin-bottom", "0px"], 
        ["margin-left", "0px"], 
        ["margin-right", "0px"], 
        ["padding-top", "0px"], 
        ["padding-bottom", "0px"], 
        ["padding-left", "0px"], 
        ["padding-right", "0px"],
        ["display", ["block", "flex", "none", "inline", "inline-block",
            "inline-table", "run-in"
        ]],
        ["border-width", "0px"],
        ["border-style", ["none", "hidden", "dotted", "dashed", 
            "solid", "double", "groove",
            "ridge", "inset", "outset"]], 
        ["cursor", ["default", "crosshair", "help", "move", 
            "pointer", "progress", "text",
            "wait", "n-resize", "ne-resize",
            "e-resize", "se-resize", "s-resize",
            "sw-resize", "w-resize", "nw-resize"]], 
        ["color", "#000000"], 
        ["background-color", "#FFFFFF"], 
        ["border-color", "#000000"],
        ["overflow", ["visible", "hidden", "scroll", "auto", "inherit"]],
    ]);

    // in development

    return props;
}
