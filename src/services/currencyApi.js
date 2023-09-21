const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/currency";
const token = "d7a6eb7bf6b07f34d9e233746c5980c1642302a7";
const query = "руб";

const options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
}

export async function getCurrency () {
    
    const response = await fetch(url, options)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error))
    const json = await response.json()
    console.log('currency', json)
    return json
}