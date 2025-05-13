
import axios from "axios";

const API_BASE_URL = "https://pixabay.com/api/";

const API_KEY = "50191588-7d0b750c5d17d1451aa626dbf";

export function getImagesByQuery(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    }

    return axios.get(API_BASE_URL, { params }).then(res => res.data).catch(error => {throw error; })
}