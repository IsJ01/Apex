export default () => {
    let lang = localStorage.getItem("lang");
    if (!lang) {
        localStorage.setItem("lang", "Русский (Rus)");
        lang = localStorage.getItem("lang");
    }
    return lang;
}