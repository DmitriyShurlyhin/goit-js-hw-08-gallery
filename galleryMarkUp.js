import items from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  closeModalButton: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};
