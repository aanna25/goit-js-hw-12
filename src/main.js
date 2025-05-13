
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const form = document.querySelector(".form");
const input = form.querySelector("[name='search-text']");

form.addEventListener("submit", getImagesOnSubmit);

function getImagesOnSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {

    iziToast.error({
      title: "Error",
      message: "Please enter a search query",
      position: "topRight",
    });
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: "No Results",
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
      } else {
        createGallery(data.hits);
        iziToast.success({
          title: "Success",
          message: `You found ${data.hits.length} images`,
          position: "topRight",
        });
      }
    })
    .catch(error => {
      iziToast.error({
        title: "Error",
        message: "Something went wrong. Please try again later.",
        position: "topRight",
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}