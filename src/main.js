'use strict';

import { getImages } from "./js/pixabay-api";
import { galleryEl, createMarkUp } from "./js/render-function";
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const formEl = document.querySelector(".form");
const inputEl = document.querySelector("input");
const loaderEl = document.querySelector(".loader");


let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});


formEl.addEventListener("submit", event => {
    event.preventDefault();


    loaderEl.classList.add("is-open");
    galleryEl.innerHTML = "";


    const queryTrimed = inputEl.value.trim();


    if (queryTrimed === "") {
        loaderEl.classList.remove("is-open");
        return iziToast.warning({
            title: "Caution",
            message: "Please complete the field!",
            position: "center",
            timeout: 2000,
        });
    }


    getImages(queryTrimed)
        .then(response => {
            if (response.hits.length === 0) {
                return iziToast.info({
                    title: "Sorry",
                    message: "There are no images matching your search query. Please try again!",
                    position: "center",
                    timeout: 2000,
                });
            }

            createMarkUp(response.hits);

        })
        .catch(error => {
            console.error("Error fetching images:", error);
            iziToast.error({
                title: "Error",
                message: "There was an error fetching the images.",
                position: "center",
                timeout: 2000,
            });
        })
        .finally(() => {

            loaderEl.classList.remove("is-open");
        });

    inputEl.value = "";
});
