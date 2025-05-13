
import axios from "axios";

const API_BASE_URL = "https://pixabay.com/api/";

const API_KEY = "50191588-7d0b750c5d17d1451aa626dbf";

export async function getImagesByQuery(query, page = 1) {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: true,
          page,
          per_page: 15,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch images: ${error.message}`);
    }
  }