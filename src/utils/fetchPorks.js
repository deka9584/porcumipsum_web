import config from "../resources/config.json";

async function fetchPorks (listName = "") {
    const apiUrl = process.env.NODE_ENV === "development" ? config.developmentApiUrl : config.productionApiUrl;
    const route = `${apiUrl}?list=${listName}`;

    try {
        const response = await fetch(route, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        return await response.json();
    }
    catch (error) {
        console.error(error);
    }
    
    return null;
}

export default fetchPorks;