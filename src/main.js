'use strict';

// Імпорти
import { getImages } from "./js/pixabay-api"; // Функція для запиту
import { createMarkUp } from "./js/render-function"; // Функція для рендерингу
import { galleryEl } from "./js/render-function"; // Контейнер галереї
import iziToast from "izitoast"; // Для сповіщень
import "izitoast/dist/css/iziToast.min.css"; // Стилі для iziToast
import SimpleLightbox from "simplelightbox"; // Для показу зображень
import "simplelightbox/dist/simple-lightbox.min.css"; // Стилі для SimpleLightbox

// Змінні
const formEl = document.querySelector(".form");
const inputEl = document.querySelector("input");
const loaderEl = document.querySelector(".loader");

// Ініціалізація бібліотеки SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});

// Обробка форми
formEl.addEventListener("submit", event => {
    event.preventDefault();

    // Показуємо індикатор завантаження
    loaderEl.classList.add("is-open");
    galleryEl.innerHTML = ""; // Очищаємо галерею перед новим запитом

    // Отримуємо значення пошукового запиту
    const queryTrimed = inputEl.value.trim();

    // Перевірка на порожній запит
    if (queryTrimed === "") {
        loaderEl.classList.remove("is-open");
        return iziToast.warning({
            title: "Caution",
            message: "Please complete the field!",
            position: "topRight",
        });
    }

    // Виконання запиту до API
    getImages(queryTrimed)
        .then(response => {
            if (response.hits.length === 0) {
                return iziToast.info({
                    title: "Sorry",
                    message: "There are no images matching your search query. Please try again!",
                    position: "topRight",
                });
            }

            // Створення розмітки для зображень
            createMarkUp(response.hits);

            // Оновлення SimpleLightbox після додавання нових зображень
            lightbox.refresh();
        })
        .catch(error => {
            console.error("Error fetching images:", error);
            iziToast.error({
                title: "Error",
                message: "There was an error fetching the images.",
                position: "topRight",
            });
        })
        .finally(() => {
            // Приховуємо індикатор завантаження
            loaderEl.classList.remove("is-open");
        });

    // Очищаємо поле вводу
    inputEl.value = "";
});
