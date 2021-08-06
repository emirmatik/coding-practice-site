export const get = (path, key, callback) => {
    fetch(path)
        .then(res => res.json())
        .then(data => callback(key, data))
}