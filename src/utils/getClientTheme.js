function getClientTheme () {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default getClientTheme;