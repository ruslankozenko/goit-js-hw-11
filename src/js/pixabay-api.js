'use strict';

export function getImages(query) {
    const API_KEY = "47281982-63a34c7367b72af3cb7b29a97";
    const baseURL = "https://pixabay.com/api/?";
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });
    const URL = baseURL + params;
    return fetch(URL).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}