import items from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  closeModalButton: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
  lightboxContent: document.querySelector(".lightbox__content"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

const createGallery = items
  .map((el) => {
    return `<li class = "gallery__item">
    <a class="gallery__link" href="${el.original}">
       <image class = "gallery__image" 
          src = "${el.preview}" 
          data-source="${el.original}" 
          alt = "${el.description}">
       </a>
     </li>`;
  })
  .join("");

refs.gallery.insertAdjacentHTML("beforeend", createGallery);

// const createGallery = ({ original, preview, description }) => {
//   const galleryItem = document.createElement("li");
//   galleryItem.classList.add(".galerry__item");

//   const galleryLink = document.createElement("a");
//   galleryLink.classList.add(".gallery__link");
//   galleryLink.setAttribute("href", original);

//   const galleryImg = document.createElement("img");
//   galleryImg.classList.add(".gallery__image");
//   galleryImg.setAttribute("src", preview);
//   galleryImg.setAttribute("data-source", original);
//   galleryImg.setAttribute("alt", description);

//   galleryLink.appendChild(galleryImg);
//   galleryItem.appendChild(galleryLink);
//   refs.gallery.appendChild(galleryItem);

//   return galleryItem;
// };

// const galleryItems = items.map((item) => createGallery(item));
// refs.gallery.append(...galleryItems);

const openModal = (event) => {
  event.preventDefault();

  window.addEventListener("keydown", onPressEsc);
  window.addEventListener("keydown", onPressRight);
  window.addEventListener("keydown", onPressLeft);

  if (event.target === event.currentTarget) {
    return;
  }

  refs.lightbox.classList.add("is-open");
  refs.lightboxImage.src = event.target.getAttribute("data-source");
  refs.lightboxImage.alt = event.targer.alt;
};

const closeModal = () => {
  window.removeEventListener("keydown", onPressEsc);
  window.removeEventListener("keydown", onPressRight);
  window.removeEventListener("keydown", onPressLeft);

  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
};

const onOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

function onPressEsc(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

function onPressRight(event) {
  if (event.code === "ArrowRight") {
    onRightNext(items, refs.lightboxImage);
  }
}

function onPressLeft(event) {
  if (event.code === "ArrowLeft") {
    onLeftNext(items, refs.lightboxImage);
  }
}

function onRightNext() {
  const acttiveImg = items.find(
    (img) => img.original === refs.lightboxImage.src
  );
  let index = acttiveImg ? items.indexOf(acttiveImg) : 0;

  if (index < items.length - 1) {
    index += 1;
  } else {
    index = 0;
  }

  refs.lightboxImage.src = items[index].original;
  refs.lightboxImage.alt = items[index].description;
}

function onLeftNext(arr, ref) {
  const acttiveImg = arr.find((img) => img.original === ref.src);
  let index = acttiveImg ? arr.indexOf(acttiveImg) : 0;

  if (index > 0) {
    index -= 1;
  } else {
    index = arr.length - 1;
  }

  ref.src = arr[index].original;
  ref.alt = arr[index].description;
}

refs.gallery.addEventListener("click", openModal);
refs.closeModalButton.addEventListener("click", closeModal);
refs.lightboxOverlay.addEventListener("click", onOverlayClick);
