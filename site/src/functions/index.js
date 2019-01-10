const endpoint = "http://localhost:3000";

export function fileHeaders() {
    return new Promise((resolve, reject) => {
        fetch(endpoint + "/headers")
        .then((res) => res.json())
        .then((resp) => {
            resolve(resp);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        })
    });
}

export function generateFile(query) {
    return new Promise((resolve, reject) => {
        fetch(endpoint + "/generate?" + query)
        .then((res) => res.json())
        .then((resp) => {
            resolve(resp);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        })
    });
}

export function downloadFile(fileEndpoint) {
    return new Promise((resolve, reject) => {
        fetch(fileEndpoint)
        .then((resp) => {
            resolve(resp);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        })
    });
}