function show_change(text) {
    let show_window = document.createElement("div");
    show_window.id = "show-window";
    show_window.className = "show-window";
    show_window.style.position = "absolute";
    let width = window.innerWidth;
    let height = window.innerHeight;
    show_window.style.left = `${(width - 100) / 2}px`;
    show_window.style.top = `${(height - 75) / 2}px`;
    document.getElementById("root").appendChild(show_window);
    show_window.innerHTML = text;

    setTimeout(() => {
        if (document.getElementById(show_window.id)) {
            document.getElementById(show_window.id).remove();
        }
    }, 500);
}


export {show_change};