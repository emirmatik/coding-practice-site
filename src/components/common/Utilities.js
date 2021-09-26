export const get = async (path, key, callback = null) => {
    const res = await fetch(path);
    const data = await res.json();

    if (callback !== null) {
        callback(key, data)
    } else {
        return data;
    }
}

export const post = async (path, key, body, callback = null) => {
    const res = await fetch(path, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();

    if (callback !== null) {
        callback(key, data)
    } else {
        return data;
    }
}
