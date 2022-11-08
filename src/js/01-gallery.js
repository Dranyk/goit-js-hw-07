import { galleryItems } from './gallery-items.js';
// Change code below this line
// console.log(galleryItems);
const galleryContainer  = document.querySelector('.gallery')
const galleryMarkup = createGalleryMarkup(galleryItems);


const backdropImg = basicLightbox.create(`<img >`);
addLazyloadToImg();
// console.log(galleryMarkup);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick)


function createGalleryMarkup(galleryItems) {
    return galleryItems
      .map(({ preview, original, description }) => {
        return `<div class="gallery__item">
    <a class="gallery__link" href='${original}'>
      <img
        class="gallery__image"
        src='${preview}'
        data-source='${original}'
        alt='${description}'
      />
    </a>
  </div>`;
      })
      .join("");
  }


function onGalleryContainerClick(evt) {
    const isImgSwatchEl = evt.target.classList.contains('gallery__image');

    if(!isImgSwatchEl) {
        return;
    }

    // if (evt.target.nodeName !== "IMG") {
    //     return;
    //   }
    
    evt.preventDefault();

  const originalImgUrl = evt.target.dataset.source;
  backdropImg.element().querySelector("img").src = originalImgUrl;
  backdropImg.show();

  document.addEventListener("keydown", onEscKeyDownBackdropClose);
}

function onEscKeyDownBackdropClose(evt) {
  if (!(backdropImg.visible() && evt.key === "Escape")) {
    return;
  }
  backdropImg.close();
  document.removeEventListener("keydown", onEscKeyDownBackdropClose);
}

function addLazyloadToImg() {
  const lazyImages = document.querySelectorAll(".gallery__image");
  if ("loading" in HTMLImageElement.prototype) {
    lazyImages.forEach((imgEl) => {
      imgEl.loading = "lazy";
    });

  } else {
    console.log('!!!!!!!!!!!!');
    const lazyScript = document.createElement("script");

    lazyScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    lazyScript.integrity =
      "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    lazyScript.crossorigin = "anonymous";
    lazyScript.referrerpolicy = "no-referrer";
    document.body.appendChild(lazyScript);
  }
}

