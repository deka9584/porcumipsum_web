import getRndInt from "./getRndInt";

function pickRandom (array = []) {
    const max = array.length - 1;

    if (max < 0) {
        return null;
    }

    return array[getRndInt(0, max)];
}

export default pickRandom;