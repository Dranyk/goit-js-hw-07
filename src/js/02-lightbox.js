import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

addAttributesForSimpleLightbox(galleryContainer);
addLazyloadToImg();
const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li><a 
        class="gallery__item" 
      href="${original}">
  <img class="gallery__image" 
  src="${preview}" 
  alt="${description}" />
</a></li>`;
    })
    .join("");
}

function addAttributesForSimpleLightbox(galleryEl) {
  [...galleryEl.getElementsByTagName("a")].map((el) => {
    const imgEl = el.getElementsByTagName("img")[0];
    imgEl.title = imgEl.alt;
  });
}

function addLazyloadToImg() {
  const lazyImages = document.querySelectorAll(".gallery__image");
  if ("loading" in HTMLImageElement.prototype) {
    lazyImages.forEach((imgEl) => {
      imgEl.loading = "lazy";
    });
  } else {
    const lazyScript = document.createElement("script");

    lazyScript.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    lazyScript.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    lazyScript.crossorigin = "anonymous";
    lazyScript.referrerpolicy = "no-referrer";
    document.body.appendChild(lazyScript);
  }
}
