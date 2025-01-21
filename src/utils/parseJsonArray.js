function parseJsonArray (jsonString) {
    try {
        const parsed = jsonString ? JSON.parse(jsonString) : null;

        if (Array.isArray(parsed)) {
            return parsed;
        }
    }
    catch (error) {
        console.error(error);
    }

    return [];
}

export default parseJsonArray;