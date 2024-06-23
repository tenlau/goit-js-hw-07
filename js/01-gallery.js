import { galleryItems } from './gallery-items.js';
// Change code below this line
// Create and render markup from the galleryItems data array
const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  }).join('');
}

// Implementing delegation to ul.gallery and getting the URL of a large image
galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  
  const isGalleryImage = event.target.classList.contains('gallery__image');
  if (!isGalleryImage) {
    return;
  }

  const originalImageURL = event.target.dataset.source;
  openModal(originalImageURL);
}

function openModal(imageUrl) {
    const instance = basicLightbox.create(`
        <img src="${imageUrl}" class="modal-image">
    `, {
        onShow: (instance) => {
            window.addEventListener('keydown', onEscKeyPress);
            instance.element().addEventListener('click', onModalClick);
        },
        onClose: (instance) => {
            window.removeEventListener('keydown', onEscKeyPress);
            instance.element().removeEventListener('click', onModalClick);
        }
    });

    instance.show();

    function onEscKeyPress(event) {
        if (event.key === 'Escape') {
            instance.close();
        }
    }

    function onModalClick(event) {
        if (event.target.tagName === 'IMG') {
            instance.close();
        }
    }
}

console.log(galleryItems);
