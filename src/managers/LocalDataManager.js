import parseJsonArray from "../utils/parseJsonArray";
import config from "../resources/config.json";

class LocalDataManager {
    static addGeneratorHistory (paragraphs) {
        const history = parseJsonArray(localStorage.getItem("generatorHistory"))
            .sort((a, b) => b.createdAt - a.createdAt);

        history.unshift({ paragraphs, createdAt: Date.now() });

        if (history.length > config.historyLimit) {
            history.length = config.historyLimit;
        }

        localStorage.setItem("generatorHistory", JSON.stringify(history));
    }

    static getGeneratorHistory () {
        const history = parseJsonArray(localStorage.getItem("generatorHistory"));
        return history.sort((a, b) => b.createdAt - a.createdAt);
    }

    static getFavourites () {
        return parseJsonArray(localStorage.getItem("favourites"));
    }

    static removeFavourite (text = "") {
        const favourites = parseJsonArray(localStorage.getItem("favourites"));
        const removeIndex = favourites.findIndex(f => f === text);

        if (removeIndex !== -1) {
            favourites.splice(removeIndex, 1);
            localStorage.setItem("favourites", JSON.stringify(favourites));
        }
    }

    static removeGeneratorHistoryIndex (index) {
        const history = parseJsonArray(localStorage.getItem("generatorHistory"));

        if (index in history) {
            history.splice(index, 1);
            localStorage.setItem("generatorHistory", JSON.stringify(history));
        }
    }

    static saveFavourite (text = "") {
        const favourites = parseJsonArray(localStorage.getItem("favourites"));

        if (!favourites.includes(text)) {
            favourites.push(text);
            localStorage.setItem("favourites", JSON.stringify(favourites));
        }
    }

    static saveGeneratorHistory (history = []) {
        localStorage.setItem("generatorHistory", JSON.stringify(history));
    }

    static isFavourite (text = "") {
        const favourites = parseJsonArray(localStorage.getItem("favourites"));
        return favourites.includes(text);
    }
}

export default LocalDataManager;