
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions.js";

const form = document.querySelector(".form");
const input = form.querySelector("[name='search-text']");
const loadMoreButton = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

form.addEventListener("submit", handleSubmit);

loadMoreButton.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
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

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  hideLoadMoreButton();
  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: "No Results",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
    } else {
      createGallery(data.hits);

      if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
        hideLoadMoreButton();
        if (currentPage * 15 >= totalHits) {
          iziToast.info({
            title: "End of Results",
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
          });
        }
      } else {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: "smooth",
      });
    }

    if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      if (currentPage * 15 >= totalHits) {
        iziToast.info({
          title: "End of Results",
          message: "We're sorry, but you've reached the end of search results.",
          position: "topRight",
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
}