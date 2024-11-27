'use strict';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery-link", {
  captionsData: "alt",
  captionDelay: 250,
});

export const galleryEl = document.querySelector(".gallery");
export function createMarkUp(images) {
  const markUp = images
    .map(
      image => `<li class="gallery-item">
  <a class="gallery-link"
    href="${image.largeImageURL}"
    >
    <img
      src="${image.webformatURL}"
      alt="${image.tags}"
  />
   <ul class="img-dscr">
    <li>
      <p><b>Likes</b> ${image.likes}</p>
    </li>
    <li>
      <p><b>Views</b> ${image.views}</p>
    </li>
    <li>
      <p><b>Comments</b> ${image.comments}</p>
    </li>
    <li>
      <p><b>Downloads</b> ${image.downloads}</p>
    </li>
  </ul>
  </a>
</li>`

    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markUp);

  lightbox.refresh();

}