'use strict';

import "./js/pixabay-api";
import { getImages } from "./js/pixabay-api";
import "./js/render-function";
import { createMarkUp } from "./js/render-function";
import { galleryEl } from "./js/render-function";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector("input");
const loaderEl = document.querySelector(".loader");

formEl.addEventListener("submit", event => {
    event.preventDefault();
    loaderEl.classList.add("is-open");
    galleryEl.innerHTML = "";
    lightbox.refresh();
    const queryTrimed = inputEl.value.trim();
    if (queryTrimed === "") {
        loaderEl.classList.remove("is-open");
        return iziToast.warning({
            title: "Caution",
            message: "Please complete the field!",
            position: "topRight",
        });
    }
    getImages(queryTrimed)
        .then(response => {
            if (response.hits.length === 0) {
                return iziToast.info({
                    title: "Sorry",
                    message:
                        "There are no images matching your search query. Please try again!",
                    position: "topRight",
                });
            }
            createMarkUp(response.hits);
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        })
        .finally(() => loaderEl.classList.remove("is-open"));
    inputEl.value = "";
});

const lightbox = new SimpleLightbox(".gallery-link", {
    captionsData: "alt",
    captionDelay: 250,
});


